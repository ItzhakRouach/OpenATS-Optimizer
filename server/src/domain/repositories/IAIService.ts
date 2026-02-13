/**
 * Interface: IAIService
 * The contract that ANY AI tool must follow.
 * SO in future we can change to any ai tool we want
 */

export interface AIAnalysisResult {
  score: number;
  missingKeywords: string[];
  feedback: string[];
}

export interface IAIService {
  /**
   * Analyzes resume text against a job description
   * @param resumeText - The raw text extracted from the PDF
   * @param jobDescription - The target job description
   * @returns A promise resolving to structured analysis data
   */
  analyzeResume(
    resumeText: string,
    jobDescription: string,
  ): Promise<AIAnalysisResult>;
}
