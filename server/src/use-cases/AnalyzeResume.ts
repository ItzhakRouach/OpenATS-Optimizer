import {
  AIAnalysisResult,
  IAIService,
} from "../domain/repositories/IAIService";
/**
 * Use Case: AnalyzeResume
 * Orchestrates the flow: Get Text -> Call AI -> Return Result
 */

export class AnalyzeResume {
  constructor(private aiService: IAIService) {}

  async execute(resumeText: string, jobDescription: string) {
    if (!resumeText || !jobDescription) {
      throw new Error("Resume text and job Description are required");
    }

    // call the AI service
    console.log("Analysis the resume ....");
    const analysis = await this.aiService.analyzeResume(
      resumeText,
      jobDescription,
    );
    // Here add log and save to db
    console.log("Analysis completed !");
    return analysis;
  }
}
