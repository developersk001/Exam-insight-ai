import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  FileText, 
  UploadCloud, 
  Settings2, 
  LineChart, 
  BookOpen, 
  Award, 
  Compass, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  RefreshCw, 
  Code,
  FileSpreadsheet,
  Cpu,
  ChevronRight,
  ChevronDown,
  Info,
  Copy,
  TrendingUp,
  X,
  Database,
  Download,
  Calendar
} from "lucide-react";
import { jsPDF } from "jspdf";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { ExamAnalysis, QuestionBreakdown } from "./types";
import { SAMPLE_EXAMS } from "./sampleData";
import { JEE_YEARLY_EXAMS } from "./jeeYearlyData";

export default function App() {
  // Key UI & Analysis State
  const [activeTab, setActiveTab] = useState<"summary" | "chapters" | "concepts" | "strategy" | "planner">("summary");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [fileUrl, setFileUrl] = useState<string>("");
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ExamAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeAnalysisSource, setActiveAnalysisSource] = useState<string>("");
  const [selectedJeeYear, setSelectedJeeYear] = useState<"2025" | "2024" | "2023">("2025");
  const [compareYearId, setCompareYearId] = useState<string>("jee_main_2025");

  // Generate 7-day study planner dynamically using High-Yield Chapters and High Difficulty questions
  const studyPlan = useMemo(() => {
    if (!analysisResult) return [];
    
    const highYield = analysisResult.insights?.highYieldChapters || [];
    const hardQuestions = analysisResult.breakdown?.filter(
      (q) => q.difficulty && q.difficulty.toLowerCase() === "hard"
    ) || [];
    
    const allChapters = analysisResult.chapters || [];
    const plan = [];

    for (let day = 1; day <= 7; day++) {
      let dayTitle = `Day ${day}: `;
      let dayTopic = "";
      let focusType: "high-yield" | "high-difficulty" | "mixed" | "review" = "mixed";
      let priorityItems: string[] = [];
      let advice = "";

      if (day === 1) {
        dayTitle += "Syllabus Kickoff & Foundation";
        focusType = "high-yield";
        const chapter = highYield[0] || allChapters[0];
        if (chapter) {
          dayTopic = chapter.chapterName;
          priorityItems.push(`Focus on understanding core definitions and basic formulae for this high-yield core area.`);
          if (chapter.roiExplanation) {
            priorityItems.push(chapter.roiExplanation);
          }
        } else {
          dayTopic = "Foundational Concept Review";
          priorityItems.push("Review high-frequency equations and standard syllabus blocks.");
        }
        advice = "Identify core textbook proofs first before jumping into multi-concept questions.";
      } else if (day === 2) {
        dayTitle += "Challenging Concept Breakthrough";
        focusType = "high-difficulty";
        const hardQ = hardQuestions[0];
        if (hardQ) {
          dayTopic = `${hardQ.coreChapter || "Hard Domain"}`;
          priorityItems.push(`Deep Dive: ${hardQ.specificTopic || "Advanced Problem Formula"}`);
          priorityItems.push(`Concept Master: Try to break down the logic of "${hardQ.conceptTested}"`);
          priorityItems.push(`Verify against item ${hardQ.questionNumber} style (${hardQ.questionType})`);
        } else {
          dayTopic = "Toughest Syllabus Segments";
          priorityItems.push("Identify the top 3 topics you kept skipping and write down their basic equations.");
        }
        advice = "Work deliberately slow. Solving 3 tough questions with 100% clarity beats skimming 20.";
      } else if (day === 3) {
        dayTitle += "High Return Chapter Consolidation";
        focusType = "high-yield";
        const chapter = highYield[1] || highYield[0] || allChapters[1] || allChapters[0];
        if (chapter) {
          dayTopic = chapter.chapterName;
          priorityItems.push(`Solve representative standard previous-year questions from this lucrative cluster.`);
          if (chapter.roiExplanation) {
            priorityItems.push(chapter.roiExplanation);
          }
        } else {
          dayTopic = "Thematic Patterns Reinforcement";
          priorityItems.push("Target core chapters where marks allocation density is highest.");
        }
        advice = "Set a strict 3-minute limit per standard-tier question to train diagnostic speed.";
      } else if (day === 4) {
        dayTitle += "Advanced Multi-concept Rigor Drill";
        focusType = "high-difficulty";
        const hardQ = hardQuestions[1] || hardQuestions[0];
        if (hardQ) {
          dayTopic = `${hardQ.coreChapter || "High Difficulty Domain"}`;
          priorityItems.push(`Toughest Topic: Explore the specific mechanism of "${hardQ.specificTopic}"`);
          priorityItems.push(`Focus on: "${hardQ.conceptTested}"`);
        } else {
          dayTopic = "Complex Derivatives & Proofs Practice";
          priorityItems.push("Re-solve past year papers strictly looking for tricky question qualifiers.");
        }
        advice = "Break down multi-step logic into smaller, independent sub-calculations.";
      } else if (day === 5) {
        dayTitle += "Syllabus Synthesis & Mixed Practice";
        focusType = "mixed";
        const chapter = highYield[2] || allChapters[2] || allChapters[0];
        const hardQ = hardQuestions[2] || hardQuestions[1] || hardQuestions[0];
        
        if (chapter) {
          dayTopic = `${chapter.chapterName}`;
          priorityItems.push(`High Study-ROI Target: Revise formulas and summary notes of "${chapter.chapterName}"`);
        } else {
          dayTopic = "Interdisciplinary Subject Core";
          priorityItems.push("Pick random topics from past exams and write brief summary maps.");
        }
        
        if (hardQ) {
          priorityItems.push(`Challenging Topic Checklist: Double-check edge-cases for "${hardQ.specificTopic}"`);
        }
        advice = "Do not look up solutions instantly. Struggle with a tough question for at least 8 minutes.";
      } else if (day === 6) {
        dayTitle += "Timed Simulation & Strategy Check";
        focusType = "review";
        dayTopic = "Speed-Precision Synchronization";
        priorityItems.push("Perform a 45-minute timed mini-mock exam under strict quiet-room rules.");
        if (analysisResult.insights?.strategicAdvice && analysisResult.insights.strategicAdvice.length > 0) {
          priorityItems.push(`Align study structure to: "${analysisResult.insights.strategicAdvice[0]}"`);
        }
        advice = "Simulate actual exam configurations: omit questions you are unsure of to protect score buffers.";
      } else {
        dayTitle += "Pre-Exam Diagnostic Clearance";
        focusType = "review";
        dayTopic = "Self-Evaluation & Error Traps List";
        priorityItems.push("Skim through your catalog of past mistakes, formula files, and handbook notes.");
        if (analysisResult.insights?.strategicAdvice && analysisResult.insights.strategicAdvice.length > 1) {
          priorityItems.push(`Strategic Diagnostic Check: "${analysisResult.insights.strategicAdvice[1]}"`);
        }
        advice = "Minimize cognitive load, sleep early, and keep your body fully relaxed and hydrated.";
      }

      plan.push({
        day,
        dayTitle,
        dayTopic,
        focusType,
        priorityItems,
        advice
      });
    }

    return plan;
  }, [analysisResult]);

  // Table Filters (Tab 3)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Drag and Drop Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Set default sample on mount
  useEffect(() => {
    loadSample("ap_calculus");
  }, []);

  // Helper: Reset analysis states
  const handleReset = () => {
    setUploadedFileName("");
    setFileBase64(null);
    setFileMimeType(null);
    setFileUrl("");
    setErrorMsg(null);
    setIsAnalyzing(false);
  };

  // Helper: File selection & conversion
  const processFile = (file: File) => {
    if (!file) return;

    // Check file extension / mime type
    const mime = file.type;
    const isPDF = mime === "application/pdf" || file.name.endsWith(".pdf");
    const isImg = mime.startsWith("image/") || file.name.endsWith(".png") || file.name.endsWith(".jpg") || file.name.endsWith(".jpeg");

    if (!isPDF && !isImg) {
      setErrorMsg("We only support PDF files and PNG/JPG/JPEG image files.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg("File size exceeds 20MB. Please use a smaller compressed PDF or image file.");
      return;
    }

    setErrorMsg(null);
    setUploadedFileName(file.name);
    setFileMimeType(isPDF ? "application/pdf" : mime);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFileBase64(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Internal browser error reading file.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Load sample analysis instantly
  const loadSample = (key: string) => {
    handleReset();
    const allExams = { ...SAMPLE_EXAMS, ...JEE_YEARLY_EXAMS };
    const sample = allExams[key];
    if (sample) {
      setAnalysisResult(sample.data);
      setActiveAnalysisSource(`Demo: ${sample.title}`);
      setErrorMsg(null);
      setActiveTab("summary");
    }
  };

  // Submit file or URL for Gemini analysis
  const executeAnalysis = async () => {
    if (uploadMethod === "file" && (!fileBase64 || !fileMimeType)) {
      setErrorMsg("Please upload an exam paper or use the link option/sandbox.");
      return;
    }
    if (uploadMethod === "url" && !fileUrl.trim()) {
      setErrorMsg("Please paste a valid exam link/URL starting with http or https.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const payload: { fileData?: string; mimeType?: string; fileName?: string; fileUrl?: string } = {};
      if (uploadMethod === "file") {
        payload.fileData = fileBase64!;
        payload.mimeType = fileMimeType!;
        payload.fileName = uploadedFileName;
      } else {
        payload.fileUrl = fileUrl.trim();
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze paper. See console or check your link.");
      }

      setAnalysisResult(data.analysis);
      if (uploadMethod === "file") {
        setActiveAnalysisSource(`Uploaded: ${uploadedFileName}`);
      } else {
        const displayUrl = fileUrl.trim();
        setActiveAnalysisSource(`Link: ${displayUrl.length > 30 ? displayUrl.substring(0, 30) + "..." : displayUrl}`);
      }
      setActiveTab("summary");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Trigger browser-native PDF report generation via jsPDF
  const downloadPdfReport = (customData?: any, customSourceName?: string) => {
    let dataToUse = analysisResult;
    let nameToUse = activeAnalysisSource || "Uploaded Examination File Resource";

    // If passed a valid ExamAnalysis object (not a React Click/Synthetic Event)
    if (customData && typeof customData === "object" && "summary" in customData) {
      dataToUse = customData;
    }
    if (customSourceName && typeof customSourceName === "string") {
      nameToUse = customSourceName;
    }

    if (!dataToUse) return;

    const { summary, chapters, breakdown, insights } = dataToUse;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let currentY = 52; // Initial horizontal position

    // Page overflow guard function
    const checkPageBreak = (neededHeight: number) => {
      if (currentY + neededHeight > 270) {
        doc.addPage();
        currentY = 20; // top offset on new pages
        return true;
      }
      return false;
    };

    // --- COVER STYLE BACKGROUND BANNER ---
    doc.setFillColor(15, 23, 42); // slate-900 / midnight
    doc.rect(0, 0, 210, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("EXAMINSIGHT AI - EVALUATION BLUEPRINT", 14, 16);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} • Automatic Analytics Service`, 14, 23);
    
    // Indigo accent accent line
    doc.setFillColor(99, 102, 241); // indigo-500
    doc.rect(14, 27, 182, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text("CURRENT SOURCE RESOURCE:", 14, 34);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(191, 219, 254);
    const displaySrcName = nameToUse;
    doc.text(displaySrcName.length > 80 ? displaySrcName.substring(0, 80) + "..." : displaySrcName, 64, 34);

    // --- SECTION 1: EXECUTIVE BRIEFING ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("1. EXECUTIVE EXAMINATION BRIEF", 14, 52);
    
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(14, 54, 196, 54);
    currentY = 58;

    // Background block for metadata
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(241, 245, 249);
    doc.rect(14, currentY, 182, 36, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    
    doc.text("Exam Standard Name:", 18, currentY + 6);
    doc.setFont("helvetica", "normal");
    doc.text(summary.examName || "Comprehensive Exam Mode", 64, currentY + 6);

    doc.setFont("helvetica", "bold");
    doc.text("Subject Classification:", 18, currentY + 12);
    doc.setFont("helvetica", "normal");
    doc.text(summary.subject || "Academic Standard", 64, currentY + 12);

    doc.setFont("helvetica", "bold");
    doc.text("Total Item Allocation:", 18, currentY + 18);
    doc.setFont("helvetica", "normal");
    doc.text(`${summary.totalQuestions} Questions Mapped`, 64, currentY + 18);

    doc.setFont("helvetica", "bold");
    doc.text("Aggregate Mark Metric:", 18, currentY + 24);
    doc.setFont("helvetica", "normal");
    doc.text(`${summary.totalMarks} Maximum Total Points`, 64, currentY + 24);

    doc.setFont("helvetica", "bold");
    doc.text("Cognitive Level Assessment:", 18, currentY + 30);
    doc.setFont("helvetica", "normal");
    doc.text(insights.cognitiveDemand || "Standard High-Order Reasoning Profiles", 64, currentY + 30);

    currentY += 42;

    // Difficulty labels
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text("ITEM DIFFICULTY DISTRIBUTION COMPOSITION", 14, currentY);
    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text("The distribution of basic, medium, and difficult question segments within the evaluation syllabus is outlined below:", 14, currentY);
    currentY += 6;

    // Badges
    const textBaseY = currentY + 7.5;
    
    // Easy
    doc.setFillColor(240, 253, 250); // emerald-50
    doc.setDrawColor(204, 251, 241);
    doc.rect(14, currentY, 56, 11, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(13, 148, 136); // teal-600
    doc.text(`EASY COMPONENT: ${summary.difficultyProfile.easy}%`, 18, textBaseY);

    // Medium
    doc.setFillColor(254, 243, 199); // amber-50
    doc.setDrawColor(253, 230, 138);
    doc.rect(77, currentY, 56, 11, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(217, 119, 6); // amber-600
    doc.text(`MEDIUM COMPONENT: ${summary.difficultyProfile.medium}%`, 80, textBaseY);

    // Hard
    doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(254, 202, 202);
    doc.rect(140, currentY, 56, 11, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38); // red-600
    doc.text(`HARD COMPONENT: ${summary.difficultyProfile.hard}%`, 144, textBaseY);

    currentY += 18;

    // Syllabi Themes Highlights
    if (insights.coreThemes && insights.coreThemes.length > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text("KEY SYLLABUS TOPICS IDENTIFIED", 14, currentY);
      currentY += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      
      insights.coreThemes.forEach((theme) => {
        checkPageBreak(5);
        doc.text(`• ${theme}`, 18, currentY);
        currentY += 5;
      });
      currentY += 4;
    }

    // --- SECTION 2: WEIGHTING TABLE ---
    checkPageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("2. COMPREHENSIVE CHAPTER WEIGHT WEIGHTING & ROI", 14, currentY);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, currentY + 2.5, 196, currentY + 2.5);
    currentY += 9;

    // Header structure
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(14, currentY, 182, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text("Core Chapter / Syllabus Domain Name", 18, currentY + 5.5);
    doc.text("Questions", 120, currentY + 5.5, { align: "right" });
    doc.text("Aggregate Marks", 154, currentY + 5.5, { align: "right" });
    doc.text("Weight (%)", 188, currentY + 5.5, { align: "right" });
    
    currentY += 8;

    chapters.forEach((ch) => {
      checkPageBreak(9);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      
      doc.text(ch.chapterName || "Uncategorized", 18, currentY + 5);
      doc.text(String(ch.questionCount), 120, currentY + 5, { align: "right" });
      doc.text(`${ch.marksAllocated} pts`, 154, currentY + 5, { align: "right" });
      doc.text(`${ch.percentage}%`, 188, currentY + 5, { align: "right" });

      doc.setDrawColor(241, 245, 249);
      doc.line(14, currentY + 7.5, 196, currentY + 7.5);
      currentY += 8;
    });

    currentY += 6;

    // --- SECTION 3: DETAILED TABLE ---
    checkPageBreak(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("3. CHRONOLOGICAL QUESTION AND CONCEPT MATRIX", 14, currentY);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, currentY + 2.5, 196, currentY + 2.5);
    currentY += 9;

    // Question Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(14, currentY, 182, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text("Item ID", 17, currentY + 5.5);
    doc.text("Syllabus Domain Category", 34, currentY + 5.5);
    doc.text("Tested Principles & Concepts", 92, currentY + 5.5);
    doc.text("Difficulty", 162, currentY + 5.5);
    doc.text("Marks", 188, currentY + 5.5, { align: "right" });

    currentY += 8;

    breakdown.forEach((q) => {
      checkPageBreak(12);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);

      doc.setFont("helvetica", "bold");
      doc.text(q.questionNumber, 17, currentY + 4.5);
      doc.setFont("helvetica", "normal");

      // Wrap lines
      const chapterWords = doc.splitTextToSize(q.coreChapter || "General Topic", 54);
      const conceptWords = doc.splitTextToSize(q.conceptTested || "Topic Assessment", 64);
      
      doc.text(chapterWords, 34, currentY + 4.5);
      doc.text(conceptWords, 92, currentY + 4.5);
      
      const diffUpper = (q.difficulty || "Medium").toUpperCase();
      doc.text(diffUpper, 162, currentY + 4.5);
      doc.text(`${q.calculatedMarks} pts`, 188, currentY + 4.5, { align: "right" });

      const lineCount = Math.max(chapterWords.length, conceptWords.length, 1);
      const rowGap = (lineCount * 3.8) + 2.5;

      doc.setDrawColor(241, 245, 249);
      doc.line(14, currentY + rowGap - 0.5, 196, currentY + rowGap - 0.5);
      currentY += rowGap;
    });

    currentY += 4;

    // --- SECTION 4: HIGH ROI BLUEPRINT ---
    if (insights.highYieldChapters && insights.highYieldChapters.length > 0) {
      checkPageBreak(50);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text("4. IDENTIFIED HIGH-YIELD SEGMENTS & ROI ANALYSIS", 14, currentY);
      doc.setDrawColor(226, 232, 240);
      doc.line(14, currentY + 2.5, 196, currentY + 2.5);
      currentY += 9;

      insights.highYieldChapters.forEach((hch) => {
        const wrapExplanation = doc.splitTextToSize(hch.roiExplanation || "", 174);
        const explanationHeight = (wrapExplanation.length * 4) + 6;
        
        checkPageBreak(explanationHeight + 6);
        
        doc.setFillColor(250, 245, 255); // fuchsia soft
        doc.setDrawColor(243, 232, 255);
        doc.rect(14, currentY, 182, explanationHeight, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(107, 33, 168); // purple-800
        doc.text(`🌟 HIGH YIELD ROI SYLLABUS SEGMENT: ${hch.chapterName}`, 18, currentY + 5);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(88, 28, 135); // purple-900
        doc.text(wrapExplanation, 18, currentY + 10);
        
        currentY += explanationHeight + 4;
      });
    }

    // --- SECTION 5: PEDAGOGICAL COGNITIVE DEMAND ---
    checkPageBreak(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text("5. COGNITIVE DEMAND PEDAGOGICAL ANALYSIS", 14, currentY);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, currentY + 2.5, 196, currentY + 2.5);
    currentY += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text("Distributions evaluated according to standard academic cognitive frameworks:", 14, currentY);
    currentY += 5;

    // Recall ratio
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`A. Broad Concept Retrieval & Recall: ${insights.cognitiveRatios.recall}%`, 18, currentY);
    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Memory recollection of definitions, rules, physical laws, and direct computational formulas.", 18, currentY);
    currentY += 5.5;

    // Application ratio
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`B. Practical Integration & Execution: ${insights.cognitiveRatios.application}%`, 18, currentY);
    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Applying algebraic operations or modeling steps to typical homework, textbook, or sandbox questions.", 18, currentY);
    currentY += 5.5;

    // Problem solving ratio
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`C. Advanced Multi-Step Problem Solving: ${insights.cognitiveRatios.problemSolving}%`, 18, currentY);
    currentY += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Complex scenario reasoning, proofs, synthesis across different domains, or multi-step logic deductions.", 18, currentY);
    currentY += 10;

    // Strategic advice list
    if (insights.strategicAdvice && insights.strategicAdvice.length > 0) {
      checkPageBreak(35);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text("RECOMMENDED STRATEGIC INSTRUCTION ACTION STEPS", 14, currentY);
      currentY += 6;

      insights.strategicAdvice.forEach((advice) => {
        const wrapAdvice = doc.splitTextToSize(advice, 176);
        const adviceHeight = (wrapAdvice.length * 4) + 2;
        
        checkPageBreak(adviceHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(79, 70, 229); // indigo-600
        doc.text("» ", 14, currentY);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.text(wrapAdvice, 18, currentY);
        currentY += adviceHeight;
      });
    }

    // --- PAGE NUMBERS FOOTERS ---
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Secondary header bar
      if (i > 1) {
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 13, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.text("EXAMINSIGHT AI - CURRICULUM BLUEPRINT", 14, 8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(148, 163, 184);
        doc.text(`Academic Report: ${summary.examName || "Syllabus Weightage Map"}`, 196, 8, { align: "right" });
      }

      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(`Page ${i} of ${totalPages}`, 196, 288, { align: "right" });
      doc.text("ExamInsight AI Core Engine • Curriculum Analysis & Strategy Blueprint Report", 14, 288);
      
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.line(14, 283, 196, 283);
    }

    // Export PDF file directly
    const reportFilename = (summary.examName || "Exam_Analysis_Report")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_\-]/gi, "_");
    doc.save(`${reportFilename}_analysis_report.pdf`);
  };

  // Filters calculation (Tab 3)
  const filteredQuestions = analysisResult ? analysisResult.breakdown.filter((q) => {
    const matchesSearch = 
      q.questionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.coreChapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.specificTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.conceptTested.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDiff = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesType = typeFilter === "All" || q.questionType.toLowerCase().includes(typeFilter.toLowerCase());

    return matchesSearch && matchesDiff && matchesType;
  }) : [];

  // Toggle rows in Tab 3
  const toggleRow = (qNum: string) => {
    setExpandedQuestion(expandedQuestion === qNum ? null : qNum);
  };

  // Extract unique question types list for filter dropdown
  const uniqueTypes = analysisResult 
    ? Array.from(new Set(analysisResult.breakdown.map((q) => {
        // Group similar words together to simplify filters
        if (q.questionType.toLowerCase().includes("choice") || q.questionType.toLowerCase().includes("mcq")) return "MCQ";
        if (q.questionType.toLowerCase().includes("short")) return "Short Answer";
        if (q.questionType.toLowerCase().includes("long") || q.questionType.toLowerCase().includes("free")) return "Free Response";
        if (q.questionType.toLowerCase().includes("num") || q.questionType.toLowerCase().includes("calc")) return "Numerical";
        return q.questionType;
      })))
    : [];

  // Colors for Charting
  const COLORS_DIFF = ["#10b981", "#ef4444", "#f59e0b"]; // Easy (green), Hard (red), Medium (amber)
  const COLORS_PRIMARY = ["#4f46e5", "#06b6d4", "#ec4899", "#8b5cf6", "#f59e0b", "#10b981"];

  // Prepare Pie Chart data (Summary difficulty)
  const pieData = analysisResult ? [
    { name: "Easy Level", value: analysisResult.summary.difficultyProfile.easy, color: "#10b981" },
    { name: "Medium Level", value: analysisResult.summary.difficultyProfile.medium, color: "#f59e0b" },
    { name: "Hard Level", value: analysisResult.summary.difficultyProfile.hard, color: "#ef4444" }
  ] : [];

  // Prepare Cognitive demand data (Strategy)
  const cognitiveData = analysisResult ? [
    { name: "Concept Recall", percentage: analysisResult.insights.cognitiveRatios.recall || 0, color: "#4f46e5", desc: "Memory retrieval of formulas, physical rules, and primary definitions" },
    { name: "Application Skill", percentage: analysisResult.insights.cognitiveRatios.application || 0, color: "#06b6d4", desc: "Standard algebraic execution or applying formulas to expected scenarios" },
    { name: "Analytical Problem-Solving", percentage: analysisResult.insights.cognitiveRatios.problemSolving || 0, color: "#f59e0b", desc: "Complex multi-step reasoning, non-trivial proofs, or synthesizing ideas" }
  ] : [];

  // Historical JEE comparison datasets
  const allCompareSources = { ...SAMPLE_EXAMS, ...JEE_YEARLY_EXAMS };
  const selectedCompareData = allCompareSources[compareYearId]?.data;
  const selectedCompareTitle = allCompareSources[compareYearId]?.title || "JEE Historical Target";

  // Build Difficulty side-by-side comparison data
  const difficultyCompareData = analysisResult && selectedCompareData ? [
    {
      name: "Easy",
      "Current Paper (%)": analysisResult.summary.difficultyProfile.easy,
      "JEE Benchmark (%)": selectedCompareData.summary.difficultyProfile.easy
    },
    {
      name: "Medium",
      "Current Paper (%)": analysisResult.summary.difficultyProfile.medium,
      "JEE Benchmark (%)": selectedCompareData.summary.difficultyProfile.medium
    },
    {
      name: "Hard",
      "Current Paper (%)": analysisResult.summary.difficultyProfile.hard,
      "JEE Benchmark (%)": selectedCompareData.summary.difficultyProfile.hard
    }
  ] : [];

  // Build Cognitive side-by-side comparison data
  const cognitiveCompareData = analysisResult && selectedCompareData ? [
    {
      name: "Recall",
      "Current Paper (%)": analysisResult.insights.cognitiveRatios.recall || 0,
      "JEE Benchmark (%)": selectedCompareData.insights.cognitiveRatios.recall || 0
    },
    {
      name: "Application",
      "Current Paper (%)": analysisResult.insights.cognitiveRatios.application || 0,
      "JEE Benchmark (%)": selectedCompareData.insights.cognitiveRatios.application || 0
    },
    {
      name: "Problem-Solving",
      "Current Paper (%)": analysisResult.insights.cognitiveRatios.problemSolving || 0,
      "JEE Benchmark (%)": selectedCompareData.insights.cognitiveRatios.problemSolving || 0
    }
  ] : [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="examinsight-root-container">
      {/* Top Professional Administrative Header */}
      <header className="bg-slate-950 text-white shadow-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center border-b border-slate-800 gap-4" id="section-app-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md border border-indigo-400">
            <Compass className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-sans tracking-tight">ExamInsight AI</h1>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono py-0.5 px-2 rounded-full border border-indigo-500/30">v3.5 Core</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Expert Exam Analytics, Curriculum Mapping & Strategic Insights Engine</p>
          </div>
        </div>

        {/* Live Active Status Log */}
        <div className="flex items-center gap-4 text-xs font-mono bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-300">SERVER ACTIVE: Port 3000</span>
          </div>
          <span className="text-slate-500">|</span>
          <div className="text-slate-400">
            {activeAnalysisSource ? (
              <span className="text-indigo-300 font-semibold">{activeAnalysisSource}</span>
            ) : (
              <span>No Exam Loaded</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" id="workspace-layout">
        
        {/* Left Side Control Tower (Inputs & Configs) */}
        <aside className="w-full lg:w-96 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto shrink-0" id="sidebar-control-panel">
          
          {/* Section 1: Upload Zone */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-500" />
              Upload or Link Paper
            </span>

            {/* Upload Method Switch */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg text-xs" id="upload-method-switcher">
              <button
                type="button"
                onClick={() => setUploadMethod("file")}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  uploadMethod === "file" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                📁 Local File
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod("url")}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  uploadMethod === "url" 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🔗 Paste Link
              </button>
            </div>

            {uploadMethod === "file" ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? "border-indigo-500 bg-indigo-50/50" 
                    : uploadedFileName 
                    ? "border-emerald-500 bg-emerald-50/20" 
                    : "border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100"
                }`}
                id="drop-uploader-box"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  className="hidden"
                />
                
                {uploadedFileName ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-content-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 max-w-full truncate">
                      {uploadedFileName}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-wider">
                      Ready to Analyze
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="mt-1 text-[10px] text-red-500 hover:underline flex items-center gap-0.5"
                    >
                      <X className="w-3 h-3" /> Remove File
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <UploadCloud className="w-8 h-8 text-slate-400" />
                    <div className="text-xs font-semibold text-slate-700">
                      Drag & Drop File Here
                    </div>
                    <p className="text-[10px] text-slate-400 px-2 mt-0.5 leading-relaxed">
                      Supports <span className="font-semibold text-slate-600">PDFs</span> or <span className="font-semibold text-slate-600">Images</span> up to 20MB
                    </p>
                    <span className="text-[10px] text-indigo-600 font-semibold underline mt-1 block">
                      Or select from computer
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-4 border border-slate-200 bg-slate-50 rounded-xl" id="url-uploader-box">
                <label className="text-xs font-semibold text-slate-700">Pastable File Link / URL</label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://example.com/mock-exam.pdf"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white font-mono text-slate-800 pr-8"
                    id="input-sidebar-fileurl"
                  />
                  {fileUrl && (
                    <button
                      type="button"
                      onClick={() => setFileUrl("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[9.5px] text-slate-400 leading-relaxed">
                  Provide a direct public link to a PDF or an Image (PNG, JPG, JPEG). The backend will download and process it securely.
                </p>
              </div>
            )}

            {/* Core Action Button */}
            <button
              onClick={executeAnalysis}
              disabled={isAnalyzing || (uploadMethod === "file" ? !fileBase64 : !fileUrl.trim())}
              className={`w-full py-3 rounded-lg text-xs font-bold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 ${
                isAnalyzing
                  ? "bg-indigo-300 text-white cursor-not-allowed"
                  : (uploadMethod === "file" ? !fileBase64 : !fileUrl.trim())
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
              }`}
              id="btn-sidebar-execute"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Exam Architecture...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                  ANALYZE STRUCTURED PAPER
                </>
              )}
            </button>
          </div>

          {/* Section 2: Preloaded JEE Trends */}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-100" id="sidebar-preloaded-jee-section">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              Preloaded JEE Trends & Reports
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed -mt-1">
              Access pre-compiled curriculum blueprints and exam weightage reports from premium Indian technology entrance papers.
            </p>

            <div className="flex flex-col gap-3">
              {/* Cumulative Trends Subsection */}
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide font-mono block mb-1.5">
                  📁 Cumulative Trend Reports
                </span>
                <div className="flex flex-col gap-2">
                  {/* JEE Main Card */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-100 rounded-xl transition-all flex flex-col gap-2 group" id="card-jee-main">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">JEE Main (15 Years)</h4>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Cumulative (2011-2025)</p>
                      </div>
                      <span className="text-[9px] bg-indigo-50 text-indigo-700 font-mono font-bold uppercase tracking-wider shrink-0 px-1 py-0.5 rounded">
                        300 M
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => loadSample("jee_main_15yr")}
                        className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300 transition-all cursor-pointer"
                        title="Load analysis data into current dashboard workspaces"
                      >
                        📊 Open
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadPdfReport(SAMPLE_EXAMS["jee_main_15yr"].data, SAMPLE_EXAMS["jee_main_15yr"].title)}
                        className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
                        title="Download the full analytical document to device as PDF format"
                      >
                        <Download className="w-3 h-3 text-white" /> PDF
                      </button>
                    </div>
                  </div>

                  {/* JEE Advanced Card */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-100 rounded-xl transition-all flex flex-col gap-2 group" id="card-jee-advanced">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">JEE Advanced (10 Years)</h4>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Synthesis (2016-2025)</p>
                      </div>
                      <span className="text-[9px] bg-purple-50 text-purple-700 font-mono font-bold uppercase tracking-wider shrink-0 px-1 py-0.5 rounded">
                        360 M
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => loadSample("jee_advanced_10yr")}
                        className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300 transition-all cursor-pointer"
                        title="Load analysis data into current dashboard workspaces"
                      >
                        📊 Open
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadPdfReport(SAMPLE_EXAMS["jee_advanced_10yr"].data, SAMPLE_EXAMS["jee_advanced_10yr"].title)}
                        className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
                        title="Download the full analytical document to device as PDF format"
                      >
                        <Download className="w-3 h-3 text-white" /> PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-Year Solved Blueprints Subsection */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                    📆 Year-By-Year Solved
                  </span>
                  {/* Segmented Selector for Year */}
                  <div className="flex bg-slate-100 p-0.5 rounded-md text-[9px] font-mono font-bold">
                    {(["2025", "2024", "2023"] as const).map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setSelectedJeeYear(yr)}
                        className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                          selectedJeeYear === yr
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {/* Selected Year JEE Main Card */}
                  {JEE_YEARLY_EXAMS[`jee_main_${selectedJeeYear}`] && (
                    <div className="p-2.5 bg-indigo-50/20 border border-indigo-100/40 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-indigo-950">JEE Main {selectedJeeYear}</h4>
                          <p className="text-[9.5px] text-indigo-500 font-semibold">Official Solved Shift Metrics</p>
                        </div>
                        <span className="text-[9px] bg-indigo-100/70 text-indigo-800 font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0">
                          300 M
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => loadSample(`jee_main_${selectedJeeYear}`)}
                          className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300 transition-all cursor-pointer"
                        >
                          📊 Open
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadPdfReport(JEE_YEARLY_EXAMS[`jee_main_${selectedJeeYear}`].data, JEE_YEARLY_EXAMS[`jee_main_${selectedJeeYear}`].title)}
                          className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-white" /> PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Selected Year JEE Advanced Card */}
                  {JEE_YEARLY_EXAMS[`jee_advanced_${selectedJeeYear}`] && (
                    <div className="p-2.5 bg-purple-50/20 border border-purple-100/40 rounded-xl flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-purple-950 font-sans">JEE Advanced {selectedJeeYear}</h4>
                          <p className="text-[9.5px] text-purple-600 font-medium">Cognitive Synthesis Trends</p>
                        </div>
                        <span className="text-[9px] bg-purple-100/70 text-purple-800 font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0">
                          360 M
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => loadSample(`jee_advanced_${selectedJeeYear}`)}
                          className="flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300 transition-all cursor-pointer"
                        >
                          📊 Open
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadPdfReport(JEE_YEARLY_EXAMS[`jee_advanced_${selectedJeeYear}`].data, JEE_YEARLY_EXAMS[`jee_advanced_${selectedJeeYear}`].title)}
                          className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-white" /> PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </aside>

        {/* Right Side Main Workstation Canvas */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-y-auto" id="main-dashboard-canvas">
          
          {/* Tab Navigation Ribbon */}
          <div className="bg-white border-b border-slate-200 px-6 sticky top-0 z-10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-2 shadow-sm" id="tab-navigation-ribbon">
            <nav className="flex gap-1 overflow-x-auto py-3">
              {[
                { id: "summary", label: "Dashboard Summary", icon: LineChart },
                { id: "chapters", label: "Chapter Weightage", icon: BookOpen },
                { id: "concepts", label: "Detailed Concept Mapping", icon: ClipboardListIcon },
                { id: "strategy", label: "Preparation Strategy", icon: Award },
                { id: "planner", label: "Study Planner", icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon || LineChart;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive 
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Quick Status Pill & Download PDF Button */}
            {analysisResult && (
              <div className="py-2 flex items-center gap-2 justify-end" id="dashboard-header-actions">
                <button
                  type="button"
                  onClick={downloadPdfReport}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer"
                  id="btn-download-pdf-report"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF Report
                </button>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full font-semibold border border-emerald-200/60 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  MAPPED SUCCESSFUL
                </span>
              </div>
            )}
          </div>

          {/* Core Content Layout Area */}
          <div className="p-6 md:p-8 flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
            
            {/* Custom Error Banner */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3 shadow-sm animate-shake">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-red-950">Analysis Engine Error</h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Spinner Overlay while processing */}
            {isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-sm min-h-[400px]">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-6 tracking-wide uppercase font-mono">
                  Initializing Cognitive Grid Scanning
                </h3>
                <p className="text-xs text-slate-400 mt-2 text-center max-w-sm px-6 leading-relaxed">
                  The model is conducting a chronological scan of mathematical, conceptual, and diagrammatic items. Calculating total scores and cognitive difficulty distributions...
                </p>
                {/* Visual cycle text ticker */}
                <div className="mt-4 flex items-center gap-2 bg-slate-100 text-slate-600 font-mono text-[10px] py-1 px-3 rounded-full border border-slate-200">
                  <RefreshCw className="w-3 h-3 animate-spin text-slate-400" />
                  <span>Scanning structure: mapping marks & ROI profile</span>
                </div>
              </div>
            )}

            {!isAnalyzing && !analysisResult && (
              <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-indigo-500 mb-4 border border-slate-200">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No Exam Analyzed Yet</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                  Upload an exam paper (PDF/Image) using the sidebar or choose one of our built-in curated demo papers to populate the Interactive Assessment Dashboard.
                </p>
              </div>
            )}

            {/* ACTIVE RESULTS DASHBOARD PANELS */}
            {!isAnalyzing && analysisResult && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col gap-6"
                >
                  
                  {/* TAB 1: DASHBOARD SUMMARY */}
                  {activeTab === "summary" && (
                    <div className="flex flex-col gap-6" id="view-dashboard-summary">
                      
                      {/* Top Metric Strip cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Exam Profile</span>
                            <h3 className="text-base font-bold text-slate-800 tracking-tight leading-snug line-clamp-2">
                              {analysisResult.summary.examName}
                            </h3>
                          </div>
                          <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 ml-3">
                            <FileText className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Mapped Target Subject</span>
                            <h3 className="text-base font-bold text-slate-800 tracking-tight whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                              {analysisResult.summary.subject}
                            </h3>
                          </div>
                          <div className="w-11 h-11 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center shrink-0 ml-3">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Mapped Question Units</span>
                            <h3 className="text-2xl font-black text-slate-800 font-mono tracking-tight">
                              {analysisResult.summary.totalQuestions}
                            </h3>
                          </div>
                          <div className="w-11 h-11 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0 ml-3">
                            <Code className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Total Points / Marks</span>
                            <h3 className="text-2xl font-black text-slate-800 font-mono tracking-tight">
                              {analysisResult.summary.totalMarks}
                            </h3>
                          </div>
                          <div className="w-11 h-11 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center shrink-0 ml-3">
                            <Award className="w-5 h-5" />
                          </div>
                        </div>

                      </div>

                      {/* Double Column Breakdown: Charts & Overviews */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Box 1: Estimated Difficulty profile */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs lg:col-span-5 flex flex-col gap-4">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                              Assessment Difficulty Distribution
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-1">
                              Calculated weighted mapping based on mark allocation difficulty matrices
                            </p>
                          </div>

                          {/* Recharts Pie Chart representation */}
                          <div className="h-64 relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={65}
                                  outerRadius={90}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                              </PieChart>
                            </ResponsiveContainer>

                            {/* Centered overall label */}
                            <div className="absolute flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] uppercase text-slate-400 font-bold font-mono">Hard Ratio</span>
                              <span className="text-2xl font-black text-red-500 font-mono">
                                {analysisResult.summary.difficultyProfile.hard}%
                              </span>
                            </div>
                          </div>

                          {/* Horizontal Colored Progress bars for quick visualization */}
                          <div className="flex flex-col gap-3 pt-2">
                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                  Easy (Concept Recall or Direct Application)
                                </span>
                                <span className="font-mono">{analysisResult.summary.difficultyProfile.easy}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analysisResult.summary.difficultyProfile.easy}%` }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-amber-700 flex items-center gap-1">
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                  Medium (Analytical or algebraic execution)
                                </span>
                                <span className="font-mono">{analysisResult.summary.difficultyProfile.medium}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${analysisResult.summary.difficultyProfile.medium}%` }}></div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-red-700 flex items-center gap-1">
                                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                  Hard (Higher-order synthetic reasoning)
                                </span>
                                <span className="font-mono">{analysisResult.summary.difficultyProfile.hard}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: `${analysisResult.summary.difficultyProfile.hard}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Box 2: Qualitative Insights & High ROI chapters summary overview */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs lg:col-span-7 flex flex-col gap-6">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                              Overview Insights & Themes
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-1">
                              Overview analytical review of paper structure, core trends, and candidate constraints
                            </p>
                          </div>

                          {/* Core themes section */}
                          <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-indigo-500" />
                              Key Exam Themes detected
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {analysisResult.insights.coreThemes.map((theme, i) => (
                                <div key={i} className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl flex gap-2.5">
                                  <span className="font-mono font-bold text-indigo-500 text-sm">#0{i+1}</span>
                                  <p className="leading-relaxed font-sans">{theme}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Strategic Summary Box */}
                          <div className="mt-auto bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 flex gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold text-indigo-950 font-sans">Cognitive Strategic Advice</h4>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                {analysisResult.insights.cognitiveDemand}
                              </p>
                              <button 
                                onClick={() => setActiveTab("strategy")}
                                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                              >
                                View full preparation checklists <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Section 3: Comparative Historical Benchmark Analysis */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-6" id="comparison-benchmark-card">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1">
                              <Database className="w-3.5 h-3.5 text-indigo-500" />
                              Historical Comparative Arena
                            </span>
                            <h3 className="text-base font-bold text-slate-800 tracking-tight mt-1">
                              JEE Benchmark & Cognitive Matchup
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Contrast difficulty matrices and taxonomy vectors side-by-side with official preloaded Indian entrance exams.
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <label htmlFor="compare-year-select" className="text-xs font-bold text-slate-500 font-mono">
                              Benchmark against:
                            </label>
                            <select
                              id="compare-year-select"
                              value={compareYearId}
                              onChange={(e) => setCompareYearId(e.target.value)}
                              className="bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                            >
                              <optgroup label="Yearly Official Papers">
                                <option value="jee_main_2025">JEE Main 2025</option>
                                <option value="jee_main_2024">JEE Main 2024</option>
                                <option value="jee_main_2023">JEE Main 2023</option>
                                <option value="jee_advanced_2025">JEE Advanced 2025</option>
                                <option value="jee_advanced_2024">JEE Advanced 2024</option>
                                <option value="jee_advanced_2023">JEE Advanced 2023</option>
                              </optgroup>
                              <optgroup label="Pre-Compiled Averages">
                                <option value="jee_main_15yr">JEE Main (15-Yr Avg)</option>
                                <option value="jee_advanced_10yr">JEE Advanced (10-Yr Avg)</option>
                              </optgroup>
                            </select>
                          </div>
                        </div>

                        {selectedCompareData ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* difficulty side by side bar chart */}
                            <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl flex flex-col gap-4">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">01 / DIFFICULTY GRID MATCHUP</span>
                                <h4 className="text-xs font-bold text-slate-800 mt-0.5">Difficulty Distribution Weightage</h4>
                              </div>

                              <div className="h-60 mt-1">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={difficultyCompareData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} stroke="#e2e8f0" />
                                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} stroke="#e2e8f0" />
                                    <Tooltip 
                                      contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #cbd5e1' }}
                                      formatter={(value) => `${value}%`}
                                    />
                                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="Current Paper (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="JEE Benchmark (%)" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="text-[11px] text-slate-500 leading-relaxed font-sans mt-auto pt-3 border-t border-slate-200/50 flex flex-col gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                                  <span>Current Paper hardness ratio is <span className="font-bold font-mono text-slate-800">{analysisResult.summary.difficultyProfile.hard}%</span>.</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                                  <span>Benchmark paper ({selectedCompareTitle.replace(" Paper Analysis", "") || "selected"}) uses a <span className="font-bold font-mono text-slate-800">{selectedCompareData.summary.difficultyProfile.hard}%</span> hard configuration.</span>
                                </div>
                              </div>
                            </div>

                            {/* cognitive demand side by side bar chart */}
                            <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl flex flex-col gap-4">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">02 / COGNITIVE COHORT MATRIX</span>
                                <h4 className="text-xs font-bold text-slate-800 mt-0.5">Taxonomy & Logical Formulation Demand</h4>
                              </div>

                              <div className="h-60 mt-1">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={cognitiveCompareData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} stroke="#e2e8f0" />
                                    <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} stroke="#e2e8f0" />
                                    <Tooltip 
                                      contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #cbd5e1' }}
                                      formatter={(value) => `${value}%`}
                                    />
                                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="Current Paper (%)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="JEE Benchmark (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>

                              <div className="text-[11px] text-slate-500 leading-relaxed font-sans mt-auto pt-3 border-t border-slate-200/50 flex flex-col gap-1.5">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-700"></span>
                                  <span>Current Paper emphasizes Problem Solving at <span className="font-bold font-mono text-slate-800">{analysisResult.insights.cognitiveRatios.problemSolving || 0}%</span>.</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                  <span>Benchmark paper requires <span className="font-bold font-mono text-slate-800">{selectedCompareData.insights.cognitiveRatios.problemSolving || 0}%</span> problem solving synthesis.</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ) : (
                          <div className="py-6 text-center text-xs text-slate-400">
                            Comparison data not available for {selectedCompareTitle}. Please select another benchmark target.
                          </div>
                        )}
                        
                        {/* Dynamic analytical brief paragraph */}
                        {analysisResult && selectedCompareData && (
                          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5 animate-pulse" />
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-bold text-slate-800 font-mono uppercase tracking-wider">Benchmark Analytics Summary Note</span>
                              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                                {analysisResult.summary.difficultyProfile.hard > selectedCompareData.summary.difficultyProfile.hard ? (
                                  <span>This current test features a higher density of rigorous mathematical challenges (<span className="text-red-600 font-semibold font-mono">{analysisResult.summary.difficultyProfile.hard}%</span>) compared to the selected benchmark (<span className="text-slate-800 font-semibold font-mono">{selectedCompareData.summary.difficultyProfile.hard}%</span>). Candidate pacing strategies should expect stricter constraints.</span>
                                ) : (
                                  <span>This current test offers matching pacing guidelines (<span className="text-slate-800 font-semibold font-mono">{analysisResult.summary.difficultyProfile.hard}%</span> Hard items) similar to or milder than the historical reference reference (<span className="text-slate-800 font-mono font-semibold">{selectedCompareData.summary.difficultyProfile.hard}%</span>). Direct focus on solidifying Medium marks will guarantee high performance.</span>
                                )} 
                                <span> The ratio of analytical problem-solving is <span className="font-semibold">{analysisResult.insights.cognitiveRatios.problemSolving || 0}%</span> compared to the historical benchmark of <span className="font-semibold">{selectedCompareData.insights.cognitiveRatios.problemSolving || 0}%</span>.</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* TAB 2: CHAPTER WEIGHTAGE */}
                  {activeTab === "chapters" && (
                    <div className="flex flex-col gap-6" id="view-chapter-weightage">
                      
                      {/* Interactive Bar Chart representing Chapter Marks */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                        <div className="mb-4">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Chapter-Wise Total Marks allocation
                          </h3>
                          <p className="text-[11px] text-slate-400 mt-1">
                            A dynamic vertical visualization comparing relative point weightages for major curriculum areas
                          </p>
                        </div>

                        <div className="h-72">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analysisResult.chapters} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                              <XAxis dataKey="chapterName" tick={{ fill: '#64748b', fontSize: 10 }} stroke="#e2e8f0" />
                              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} stroke="#e2e8f0" />
                              <Tooltip 
                                cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }} 
                                contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #cbd5e1' }} 
                              />
                              <Bar dataKey="marksAllocated" name="Points allocated" radius={[4, 4, 0, 0]}>
                                {analysisResult.chapters.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS_PRIMARY[index % COLORS_PRIMARY.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Structured Weightage Data Table */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Curriculum Unit & Chapter distribution
                          </h3>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Perfect mathematical totals matching all tracked marks and questions
                          </p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                                <th className="p-4 pl-6">Chapter / Unit Name</th>
                                <th className="p-4 text-center">Questions Count</th>
                                <th className="p-4 text-center">Total Points</th>
                                <th className="p-4 text-right pr-6">% representation</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                              {analysisResult.chapters.map((chap, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-all font-sans">
                                  <td className="p-4 pl-6 font-semibold text-slate-850 flex items-center gap-2">
                                    <span 
                                      className="w-2 h-2 rounded-full cursor-default shrink-0" 
                                      style={{ backgroundColor: COLORS_PRIMARY[i % COLORS_PRIMARY.length] }}
                                    ></span>
                                    {chap.chapterName}
                                  </td>
                                  <td className="p-4 text-center font-mono font-bold text-slate-600">
                                    {chap.questionCount}
                                  </td>
                                  <td className="p-4 text-center font-mono font-black text-slate-800">
                                    {chap.marksAllocated} pts
                                  </td>
                                  <td className="p-4 text-right pr-6 font-mono font-medium text-emerald-600">
                                    {chap.percentage}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: DETAILED CONCEPT MAPPING */}
                  {activeTab === "concepts" && (
                    <div className="flex flex-col gap-6" id="view-concept-breakdown">
                      
                      {/* Filter Grid Toolbar */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                        
                        {/* Search Input widget */}
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="🔍 Query topics, chapters, formulas, theorems..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            id="input-concept-search"
                          />
                        </div>

                        {/* Interactive dropdown filters */}
                        <div className="flex flex-wrap gap-2">
                          
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Difficulty:</span>
                            <select
                              value={difficultyFilter}
                              onChange={(e) => setDifficultyFilter(e.target.value)}
                              className="text-xs bg-transparent border-none focus:outline-none focus:ring-0 font-semibold text-slate-700"
                            >
                              <option value="All">All Levels</option>
                              <option value="Easy">Easy Level</option>
                              <option value="Medium">Medium Level</option>
                              <option value="Hard">Hard Level</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Format:</span>
                            <select
                              value={typeFilter}
                              onChange={(e) => setTypeFilter(e.target.value)}
                              className="text-xs bg-transparent border-none focus:outline-none focus:ring-0 font-semibold text-slate-700"
                            >
                              <option value="All">All Formats</option>
                              {uniqueTypes.map((type, i) => (
                                <option key={i} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>

                        </div>

                      </div>

                      {/* Filter stats pill */}
                      <div className="text-xs text-slate-400 font-mono flex justify-between items-center px-2">
                        <span>Showing {filteredQuestions.length} of {analysisResult.breakdown.length} Mapped Exam Sections</span>
                        {(searchQuery || difficultyFilter !== "All" || typeFilter !== "All") && (
                          <button 
                            onClick={() => {
                              setSearchQuery("");
                              setDifficultyFilter("All");
                              setTypeFilter("All");
                            }}
                            className="text-indigo-600 hover:underline flex items-center gap-0.5"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>

                      {/* Main Question Chronological table Grid with Interactive Rows */}
                      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                <th className="p-4 pl-6 w-24 text-center">Unit/Q#</th>
                                <th className="p-4">Parent Chapter</th>
                                <th className="p-4">Specific Topic Tested</th>
                                <th className="p-4 text-center">Format</th>
                                <th className="p-4 text-center">Points</th>
                                <th className="p-4 text-center">Difficulty</th>
                                <th className="p-4 pr-6 text-center w-12 text-[9px]">Toggle</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                              {filteredQuestions.map((q, i) => {
                                const isExpanded = expandedQuestion === q.questionNumber;
                                const isHard = q.difficulty === "Hard";
                                const isEasy = q.difficulty === "Easy";
                                
                                return (
                                  <>
                                    <tr 
                                      key={`row-${i}`} 
                                      onClick={() => toggleRow(q.questionNumber)}
                                      className={`cursor-pointer transition-all ${
                                        isExpanded 
                                          ? "bg-slate-50/80" 
                                          : "hover:bg-slate-50/40"
                                      }`}
                                    >
                                      {/* Question marker label */}
                                      <td className="p-4 pl-6 text-center">
                                        <span className="font-mono bg-slate-100 text-slate-800 font-black px-2.5 py-1 rounded-md border border-slate-200/50">
                                          {q.questionNumber}
                                        </span>
                                      </td>

                                      {/* Chapter Name */}
                                      <td className="p-4 font-semibold text-slate-700">
                                        {q.coreChapter}
                                      </td>

                                      {/* Specific Topic */}
                                      <td className="p-4 text-slate-600 font-sans font-medium">
                                        {q.specificTopic}
                                      </td>

                                      {/* Exam format badge */}
                                      <td className="p-4 text-center text-slate-500 font-sans font-medium whitespace-nowrap">
                                        {q.questionType}
                                      </td>

                                      {/* Allocated points */}
                                      <td className="p-4 text-center font-mono font-black text-slate-800">
                                        {q.calculatedMarks || "—"}
                                      </td>

                                      {/* Interactive difficulty badges */}
                                      <td className="p-4 text-center">
                                        <span className={`inline-block py-0.5 px-2 rounded-full text-[10px] font-bold tracking-wide font-sans ${
                                          isHard 
                                            ? "bg-red-50 text-red-700 border border-red-200/40" 
                                            : isEasy 
                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40" 
                                            : "bg-amber-50 text-amber-700 border border-amber-200/40"
                                        }`}>
                                          {q.difficulty}
                                        </span>
                                      </td>

                                      {/* Actions Chevron down */}
                                      <td className="p-4 pr-6 text-center text-slate-400">
                                        {isExpanded ? (
                                          <ChevronDown className="w-4 h-4 text-indigo-600" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4" />
                                        )}
                                      </td>

                                    </tr>

                                    {/* Expanded Panel Segment */}
                                    <tr key={`expanded-${i}`}>
                                      <td colSpan={7} className="p-0">
                                        <AnimatePresence initial={false}>
                                          {isExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.15 }}
                                              className="overflow-hidden bg-slate-50/50 border-x-4 border-l-indigo-500 border-r-transparent"
                                            >
                                              <div className="p-6 pl-10 pr-10 grid grid-cols-1 md:grid-cols-12 gap-4">
                                                <div className="md:col-span-8 flex flex-col gap-2">
                                                  <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                                                    Concept Evaluated
                                                  </span>
                                                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans font-medium">
                                                    {q.conceptTested}
                                                  </p>
                                                </div>

                                                <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-100 flex flex-col gap-3 shadow-xs">
                                                  <div className="flex items-center gap-2">
                                                    <Info className="w-4 h-4 text-indigo-500" />
                                                    <span className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">
                                                      Curriculum Stats
                                                    </span>
                                                  </div>
                                                  <div className="flex flex-col gap-1.5 text-xs font-mono text-slate-500">
                                                    <div className="flex justify-between">
                                                      <span>Marks Value:</span>
                                                      <span className="font-bold text-slate-800">{q.calculatedMarks} points</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                      <span>Difficulty Score:</span>
                                                      <span className={`font-bold ${isHard ? "text-red-500" : isEasy ? "text-emerald-500" : "text-amber-500"}`}>
                                                        {q.difficulty}
                                                      </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                      <span>Task Format:</span>
                                                      <span className="text-slate-700">{q.questionType}</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </td>
                                    </tr>

                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: PREPARATION STRATEGY */}
                  {activeTab === "strategy" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-preparation-strategy">
                      
                      {/* Left Column: Cognitive ratios and high return sections */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Cognitive Distribution chart block */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                              Required Cognitive Demand levels
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-1">
                              An analysis of rote recollection vs logical formulation and problem-solving
                            </p>
                          </div>

                          <div className="flex flex-col gap-4 py-2">
                            {cognitiveData.map((demand, i) => (
                              <div key={i} className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="text-slate-800 font-sans flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-md" style={{ backgroundColor: demand.color }}></span>
                                    {demand.name}
                                  </span>
                                  <span className="font-mono text-slate-600">{demand.percentage}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: demand.color, width: `${demand.percentage}%` }}></div>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                                  {demand.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* High-Yield Units/Chapters list */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-4">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                              High Study-ROI Target Areas
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-1">
                              Priority chapters that yield the maximum visual return on study investment
                            </p>
                          </div>

                          <div className="flex flex-col gap-3">
                            {analysisResult.insights.highYieldChapters.map((chap, i) => (
                              <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-start gap-3.5 hover:ring-1 hover:ring-indigo-100 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-indigo-100/50">
                                  #{i+1}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-800">{chap.chapterName}</h4>
                                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    {chap.roiExplanation}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Right Column: Strategic study checklists */}
                      <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex-1 flex flex-col gap-5">
                          
                          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-350 font-mono">
                                Tactical Revision Checklists
                              </h3>
                            </div>
                            <button
                              onClick={() => {
                                const textToCopy = analysisResult.insights.strategicAdvice.join("\n");
                                navigator.clipboard.writeText(textToCopy);
                                alert("Strategy advice copied to clipboard!");
                              }}
                              className="text-[10px] font-mono text-indigo-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              title="Copy checklist text to clipboard"
                            >
                              <Copy className="w-3 h-3" /> Copy
                            </button>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            Actionable, diagnostic recommendations recommended specifically based on this exam paper's thematic weight patterns:
                          </p>

                          <div className="flex flex-col gap-4 overflow-y-auto">
                            {analysisResult.insights.strategicAdvice.map((advice, i) => (
                              <div key={i} className="flex gap-3 items-start group">
                                <div className="w-4 h-4 rounded-full border border-indigo-400/50 bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono text-indigo-300 font-bold">
                                  ✔
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium text-justify">
                                  {advice}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-auto bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                            <span className="font-bold text-amber-400 uppercase font-mono block mb-1">💡 SME Diagnostic Advice</span>
                            Revision of priority high-yield topics yields up to <span className="font-bold text-white">40% more efficiency</span> than blind random exam drills. Prioritize your weakness log using our chronological mapping list.
                          </div>

                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB 5: STUDY PLANNER */}
                  {activeTab === "planner" && (
                    <div className="flex flex-col gap-6" id="view-study-planner">
                      
                      {/* Planner Header Info Card */}
                      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">
                            🔄 Dynamically Formulated Revision
                          </span>
                          <h3 className="text-lg font-bold tracking-tight">
                            Smart 7-Day Target Revision Blueprint
                          </h3>
                          <p className="text-xs text-slate-350 max-w-2xl leading-relaxed">
                            This personalized schedule targets peak efficiency by interweaving your syllabus's highest-ROI chapters with the most complex, high-difficulty concepts. Complete each daily theme sequentially to optimize knowledge retention.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const formattedPlan = studyPlan.map(day => 
                              `[${day.dayTitle}]\nFocus Area: ${day.dayTopic}\nPriority Targets:\n${day.priorityItems.map(item => `  - ${item}`).join('\n')}\nMacro Advice: ${day.advice}`
                            ).join('\n\n');
                            navigator.clipboard.writeText(formattedPlan);
                            alert("7-Day Revision Planner copied to clipboard!");
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/25 text-white shadow-sm transition-all focus:ring-1 focus:ring-indigo-400 cursor-pointer"
                          title="Copy full 7-day study schedule to clipboard"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copy Entire Plan
                        </button>
                      </div>

                      {/* 7-Day Plan List View */}
                      <div className="flex flex-col gap-4">
                        {studyPlan.map((p) => {
                          let badgeBg = "bg-slate-100 text-slate-700 border-slate-200/60";
                          let leftLineColor = "border-slate-300";
                          if (p.focusType === "high-yield") {
                            badgeBg = "bg-indigo-50 text-indigo-700 border-indigo-100/80";
                            leftLineColor = "border-indigo-500";
                          } else if (p.focusType === "high-difficulty") {
                            badgeBg = "bg-rose-50 text-rose-700 border-rose-150";
                            leftLineColor = "border-rose-500";
                          } else if (p.focusType === "mixed") {
                            badgeBg = "bg-amber-50 text-amber-700 border-amber-100";
                            leftLineColor = "border-amber-500";
                          } else if (p.focusType === "review") {
                            badgeBg = "bg-emerald-50 text-emerald-700 border-emerald-100";
                            leftLineColor = "border-emerald-500";
                          }

                          return (
                            <div 
                              key={p.day}
                              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow transition-all relative overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-300"
                              id={`planner-day-${p.day}`}
                            >
                              {/* Left active highlight accent line */}
                              <div className={`absolute top-0 bottom-0 left-0 w-1.5 border-l-4 ${leftLineColor}`} />

                              <div className="p-5 pl-7 flex flex-col md:flex-row md:items-start justify-between gap-5">
                                <div className="flex-1 flex flex-col gap-2.5">
                                  {/* Day identity header */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded font-bold bg-slate-900 text-white shadow-sm">
                                      Day {p.day}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-800 font-sans">
                                      {p.dayTitle.split(": ")[1] || p.dayTitle}
                                    </h4>
                                    <span className={`text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeBg}`}>
                                      {p.focusType === "high-yield" && "🌟 High Study-ROI"}
                                      {p.focusType === "high-difficulty" && "🛑 Core Complexity Focus"}
                                      {p.focusType === "mixed" && "🔄 Mixed Weight Drill"}
                                      {p.focusType === "review" && "⏱ Timing Simulation"}
                                    </span>
                                  </div>

                                  {/* Focus Subject Space */}
                                  <div className="text-xs text-slate-500 font-semibold leading-relaxed">
                                    Core Area Focus: <span className="text-slate-850 font-bold">{p.dayTopic || "General Syllabus Evaluation"}</span>
                                  </div>

                                  {/* Priority Action Tasks list */}
                                  <div className="flex flex-col gap-2 mt-2">
                                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400">
                                      🎯 Daily Tasks & Verification Steps
                                    </span>
                                    <ul className="flex flex-col gap-2 pl-1">
                                      {p.priorityItems.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 group">
                                          <span className="w-5 h-5 rounded-md border border-slate-200 bg-slate-50 text-[10px] text-slate-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            {idx + 1}
                                          </span>
                                          <span className="leading-relaxed font-sans">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Macro Strategy Micro Advice bubble */}
                                <div className="md:w-72 shrink-0 bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col gap-1.5 self-stretch justify-center">
                                  <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-indigo-600/80 block">
                                    💡 SME Revision Micro-Advice
                                  </span>
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                                    {p.advice}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            )}

          </div>

          {/* Footer visual labels */}
          <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-2">
            <div>
              © 2026 ExamInsight AI • Developed with Gemini Cognitive Reasoning Engine
            </div>
            <div className="flex gap-4 font-mono text-[10px]">
              <span>STACK: React 19 • Express • Gemini 3.5</span>
              <span>•</span>
              <a 
                href="https://ai.studio/build" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-indigo-600 font-semibold hover:underline"
              >
                AI Studio Build
              </a>
            </div>
          </footer>

        </main>

      </div>
    </div>
  );
}

// Missing ClipboardListIcon definition for tab bar
const ClipboardListIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 22H15" />
    <path d="M8 4h8" />
    <path d="M12 2v4" />
    <path d="M12 11h.01" />
    <path d="M12 16h.01" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
    <path d="M16 11h.01" />
    <path d="M16 16h.01" />
  </svg>
);
