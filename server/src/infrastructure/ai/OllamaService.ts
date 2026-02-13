import axios from "axios";
import {
  IAIService,
  AIAnalysisResult,
} from "../../domain/repositories/IAIService";

/**
 * Service: OllamaService
 * Implements the IAIService interface using the local Ollama instance.
 */

export class OllamaService implements IAIService {
  private readonly baseUrl: string;
  private readonly model: string;

  constructor() {
    // Definded the ollama enviroment / on mac use 'host.docker.internal' to reach the host machine
    this.baseUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:11434";
    this.model = "llama3:latest";
  }

  async analyzeResume(
    resumeText: string,
    jobDescription: string,
  ): Promise<AIAnalysisResult> {
    const prompt = this.buildPrompt(resumeText, jobDescription);

    try {
      console.log("sending request to Lamma3...");
      const targetUrl = `${this.baseUrl}/api/generate`;
      console.log(`🔗 Connecting to AI at: ${targetUrl}`);
      const response = await axios.post(targetUrl, {
        model: this.model,
        prompt: prompt,
        stream: false,
        format: "json",
        options: {
          tempature: 0.1, // tempature responsible for model creativity from 0 to 1
        },
      });

      const result = JSON.parse(response.data.response);
      console.log("Recived result from Lamma3 ....");
      console.log("Parse the result from JSON....");

      // Map the AI return result to the defined domain object
      return {
        score: result.score || 0,
        missingKeywords: result.missingKeywords || [],
        feedback: result.feedback,
      };
    } catch (err) {
      console.log("AI Service Error:", err);
      throw new Error("Failed to communicate with AI Service");
    }
  }

  // defined the model behavior , how he should act
  private buildPrompt(resume: string, job: string) {
    return `
        ACT AS AN EXPERT ATS (APPLICANT TRACKING SYSTEM) SCANNER.

        JOB DESCRIPTION:
        "${job.slice(0, 2000)}"

        CANDIDATE RESUME:
        "${resume.slice(0, 2000)}"

        INSTRUCTION:
        1. Analyze the resume against the job description.
        2. Identify missing technical keywords.
        3. Giva a math score (0 - 100 ) as whole number and not float.
        4. Provide 3 specified improvements.

        OUTPUT FORMAT (STRICT JSON ONLY):
        {
            "score": number,
            "missing_keywords": ["keyword1","keyword2"],
            "feedback": ["fix 1","fix 2"]
        }
    `;
  }
}
