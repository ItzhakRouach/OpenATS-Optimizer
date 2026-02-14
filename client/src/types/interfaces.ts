export interface AnalysisResult {
  success: boolean;
  data: {
    score: number;
    missingKeywords: string[];
    feedback: string[];
  };
  raw_text_preview?: string;
}

export interface InterviewQuestion {
  type: string;
  question: string;
  expected_answer_points: string[];
}

export interface InterviewData {
  questions: InterviewQuestion[];
  tips: string[];
}

export interface InterviewResponse {
  success: boolean;
  data: InterviewData;
}
