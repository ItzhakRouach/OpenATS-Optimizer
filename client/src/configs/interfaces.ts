export interface AnalysisResult {
  success: boolean;
  data: {
    score: number;
    missingKeywords: string[];
    feedback: string[];
  };
  raw_text_preview?: string;
}
