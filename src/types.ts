export interface DifficultyProfile {
  easy: number;
  medium: number;
  hard: number;
}

export interface Summary {
  examName: string;
  subject: string;
  totalMarks: number;
  totalQuestions: number;
  difficultyProfile: DifficultyProfile;
}

export interface ChapterWeight {
  chapterName: string;
  questionCount: number;
  marksAllocated: number;
  percentage: number;
}

export interface QuestionBreakdown {
  questionNumber: string;
  coreChapter: string;
  specificTopic: string;
  conceptTested: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  questionType: string;
  calculatedMarks: number;
}

export interface HighYieldChapter {
  chapterName: string;
  roiExplanation: string;
}

export interface CognitiveRatios {
  recall: number;
  application: number;
  problemSolving: number;
}

export interface Insights {
  coreThemes: string[];
  highYieldChapters: HighYieldChapter[];
  cognitiveDemand: string;
  cognitiveRatios: CognitiveRatios;
  strategicAdvice: string[];
}

export interface ExamAnalysis {
  summary: Summary;
  chapters: ChapterWeight[];
  breakdown: QuestionBreakdown[];
  insights: Insights;
}
