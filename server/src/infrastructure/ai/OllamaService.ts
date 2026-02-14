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
    // Defined the ollama environment / on mac use 'host.docker.internal' to reach the host machine
    this.baseUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:11434";
    this.model = "llama3:latest";
  }

  // 1. First required method from the interface
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
          temperature: 0.1, // temperature responsible for model creativity from 0 to 1
        },
      });

      const result = JSON.parse(response.data.response);
      console.log("Received result from Llama3 ....");
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

  // 2. Second required method from the interface (This fixes your error!)
  async generateResponse(prompt: string): Promise<any> {
    try {
      console.log("Generating general response from Llama3...");
      const targetUrl = `${this.baseUrl}/api/generate`;

      const response = await axios.post(targetUrl, {
        model: this.model,
        prompt: prompt,
        stream: false,
        format: "json",
        options: {
          temperature: 0.7, // Higher temp for creative interview questions
        },
      });

      return JSON.parse(response.data.response);
    } catch (err) {
      console.error("AI Service Error:", err);
      throw new Error(
        "Failed to communicate with AI Service for general response",
      );
    }
  }

  // 3. Private helper method
  private buildPrompt(resume: string, job: string) {
    return `
        ACT AS AN EXPERT ATS (APPLICANT TRACKING SYSTEM) SCANNER.

        JOB DESCRIPTION:
        "${job}"

        CANDIDATE RESUME:
        "${resume}"

        INSTRUCTION:
        1. Analyze the resume against the job description.
        2. Identify all missing technical keywords.
        3. Giva a math score (0 - 100 ) as whole number and not float.
        4. Provide 3 to 5 specified improvements.

        OUTPUT FORMAT (STRICT JSON ONLY):
        {
            "score": number,
            "missing_keywords": ["keyword1","keyword2" , "keyword3"],
            "feedback": ["fix 1","fix 2"]
        }
    `;
  }
}
