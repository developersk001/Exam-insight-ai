import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set payload size limits high enough for exam PDFs and multiple pages
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      mode: process.env.NODE_ENV || "development",
      hasApiKey: !!process.env.GEMINI_API_KEY
    });
  });

  // API Exam Analysis Route
  app.post("/api/analyze", async (req, res) => {
    try {
      const { fileData, mimeType, fileName, fileUrl } = req.body;

      if (!fileUrl && (!fileData || !mimeType)) {
        return res.status(400).json({ error: "Missing uploaded file data, mime type, or file link/URL." });
      }

      // Read API Key - fallback to server key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "Gemini API Key is missing. Please configure it in your environment settings / secrets."
        });
      }

      let activeFileData = fileData;
      let activeMimeType = mimeType;
      let activeFileName = fileName;

      // Handle fileUrl if provided
      if (fileUrl) {
        let cleanUrl = fileUrl.trim();
        if (!/^https?:\/\//i.test(cleanUrl)) {
          return res.status(400).json({ error: "Invalid URL format. Link must start with http:// or https://" });
        }

        try {
          const urlObj = new URL(cleanUrl);
          activeFileName = path.basename(urlObj.pathname) || "linked_exam_paper";
        } catch (urlErr) {
          return res.status(400).json({ error: "Failed to parse the provided URL." });
        }

        console.log(`Fetching remote file from URL: ${cleanUrl}`);
        const fetchRes = await fetch(cleanUrl);
        if (!fetchRes.ok) {
          return res.status(400).json({ error: `Failed to download file from URL (HTTP ${fetchRes.status}: ${fetchRes.statusText})` });
        }

        const contentType = fetchRes.headers.get("content-type") || "";
        const isPdf = contentType.includes("application/pdf") || activeFileName.toLowerCase().endsWith(".pdf");
        const isImg = contentType.startsWith("image/") || 
                      activeFileName.toLowerCase().endsWith(".png") || 
                      activeFileName.toLowerCase().endsWith(".jpg") || 
                      activeFileName.toLowerCase().endsWith(".jpeg");

        if (!isPdf && !isImg) {
          return res.status(400).json({ 
            error: `Unsupported file resource fetched from the link. Converted content-type was "${contentType}". Only PDFs and standard images (PNG, JPEG) are supported.` 
          });
        }

        const arrayBuffer = await fetchRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        activeFileData = buffer.toString("base64");
        
        if (contentType.startsWith("image/") || contentType.includes("application/pdf")) {
          activeMimeType = contentType.split(";")[0];
        } else {
          activeMimeType = isPdf ? "application/pdf" : "image/jpeg";
        }
      }

      if (!activeFileData) {
        return res.status(400).json({ error: "No file content available for analysis." });
      }

      // Always select latest default model: gemini-3.5-flash
      const finalModel = "gemini-3.5-flash";

      // Initialize Google Gen AI
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      console.log(`Analyzing file "${activeFileName || "unnamed"}" (${activeMimeType}) using model: ${finalModel}`);

      // Prepare file part
      // Remove data URI prefix if present (e.g., data:application/pdf;base64,...)
      const cleanedBase64 = activeFileData.replace(/^data:[^;]+;base64,/, "");

      const filePart = {
        inlineData: {
          mimeType: activeMimeType,
          data: cleanedBase64
        }
      };

      const systemInstruction = `You are a high-level expert Exam Analyst, Subject Matter Expert (SME), and Curriculum Mapping Specialist.
Your task is to analyze the uploaded exam paper in full detail. Perform a question-by-question scan.
You must construct a comprehensive analytical breakdown returned strictly in valid JSON format.

Guidelines:
1. Examine all questions. Give them descriptive, human-readable numbers/labels (e.g. Q1, Q2a, Section B Q5).
2. Group adjacent questions into core Chapters/Units. Sum up marks perfectly to determine Chapter weightage.
3. Classify Cognitive Demand accurately:
   - 'Recall' represents rote/fact memorization.
   - 'Application' is formula deployment or standard routine processes.
   - 'Problem-solving' is higher-order reasoning, unseen multi-step proofs, or deep analytical thinking.
4. Total questions and total marks must sum up consistently across all parts of the JSON response.
5. Provide actionable, high-quality preparation strategy recommendations for students sitting this exam.`;

      const prompt = `Analyze this exam paper and map its topics, chapters, cognitive demands, and structures. Ensure all math balances. Return your output according to the schema.`;

      // Define schema for strict type parsing
      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.OBJECT,
            properties: {
              examName: { type: Type.STRING, description: "Name/Type of the exam, e.g. AP Calculus AB, Grade 12 Physics, CBSE Mathematics" },
              subject: { type: Type.STRING, description: "Subject name, e.g. Calculus, Physics, Organic Chemistry" },
              totalMarks: { type: Type.NUMBER, description: "Calculated total marks of the entire exam paper" },
              totalQuestions: { type: Type.NUMBER, description: "Total number of mapped exam questions" },
              difficultyProfile: {
                type: Type.OBJECT,
                properties: {
                  easy: { type: Type.NUMBER, description: "Percentage of exam marks categorized as Easy (0-100)" },
                  medium: { type: Type.NUMBER, description: "Percentage of exam marks categorized as Medium (0-100)" },
                  hard: { type: Type.NUMBER, description: "Percentage of exam marks categorized as Hard (0-100)" }
                },
                required: ["easy", "medium", "hard"]
              }
            },
            required: ["examName", "subject", "totalMarks", "totalQuestions", "difficultyProfile"]
          },
          chapters: {
            type: Type.ARRAY,
            description: "Table of major chapters/units tested in the exam",
            items: {
              type: Type.OBJECT,
              properties: {
                chapterName: { type: Type.STRING, description: "The name of the major chapter or unit" },
                questionCount: { type: Type.NUMBER, description: "Number of questions belong to this chapter" },
                marksAllocated: { type: Type.NUMBER, description: "Sum of marks for questions belong to this chapter" },
                percentage: { type: Type.NUMBER, description: "Percentage of total exam marks (decimal or 0-100)" }
              },
              required: ["chapterName", "questionCount", "marksAllocated", "percentage"]
            }
          },
          breakdown: {
            type: Type.ARRAY,
            description: "Question-by-question chronological curriculum and concept mapping",
            items: {
              type: Type.OBJECT,
              properties: {
                questionNumber: { type: Type.STRING, description: "E.g., Q1, Section A Q2, etc." },
                coreChapter: { type: Type.STRING, description: "Parent chapter name" },
                specificTopic: { type: Type.STRING, description: "Specific sub-topic or process, e.g., Integration by parts" },
                conceptTested: { type: Type.STRING, description: "Detailed narrative of the cognitive skill/theorem tested, e.g., Finding volume of revolution around the circular x-axis" },
                difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" },
                questionType: { type: Type.STRING, description: "E.g. MCQ, Short Answer, Numerical, Essay, Proof" },
                calculatedMarks: { type: Type.NUMBER, description: "Marks allocated specifically to this question" }
              },
              required: ["questionNumber", "coreChapter", "specificTopic", "conceptTested", "difficulty", "questionType", "calculatedMarks"]
            }
          },
          insights: {
            type: Type.OBJECT,
            properties: {
              coreThemes: {
                type: Type.ARRAY,
                description: "Major recurring themes or patterns noticed across the exam text",
                items: { type: Type.STRING }
              },
              highYieldChapters: {
                type: Type.ARRAY,
                description: "Top 2-3 high return-on-investment chapters for quick revision",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    chapterName: { type: Type.STRING },
                    roiExplanation: { type: Type.STRING, description: "Why this chapter offers a high ROI for study" }
                  },
                  required: ["chapterName", "roiExplanation"]
                }
              },
              cognitiveDemand: { type: Type.STRING, description: "Summary commentary on memorization vs application vs problem-solving split" },
              cognitiveRatios: {
                type: Type.OBJECT,
                properties: {
                  recall: { type: Type.NUMBER, description: "Percentage of content relying on pure recall/memory" },
                  application: { type: Type.NUMBER, description: "Percentage of content requiring standard formula/procedure application" },
                  problemSolving: { type: Type.NUMBER, description: "Percentage of content requiring raw novel problem-solving skills" }
                },
                required: ["recall", "application", "problemSolving"]
              },
              strategicAdvice: {
                type: Type.ARRAY,
                description: "List of highly specific strategic study recommendations based on this papers patterns",
                items: { type: Type.STRING }
              }
            },
            required: ["coreThemes", "highYieldChapters", "cognitiveDemand", "cognitiveRatios", "strategicAdvice"]
          }
        },
        required: ["summary", "chapters", "breakdown", "insights"]
      };

      const response = await ai.models.generateContent({
        model: finalModel,
        contents: { parts: [filePart, { text: prompt }] },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Received empty response text from Gemini API.");
      }

      // Safe JSON Parse
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (parseErr) {
        console.error("Failed to parse direct JSON response. Raw output:", responseText);
        // Attempt Regex extraction for outer curly brace bounds
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Unable to parse structured JSON from model response.");
        }
      }

      return res.json({ success: true, analysis: parsedData });
    } catch (error: any) {
      console.error("Gemini analysis error:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "An error occurred during exam analysis."
      });
    }
  });

  // Serve static UI assets or integrate Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ExamInsight AI server running on http://localhost:${PORT}`);
  });
}

startServer();
