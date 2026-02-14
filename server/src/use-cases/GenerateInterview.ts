import { IAIService } from "../domain/repositories/IAIService";

export class GenerateInterview {
  private aiService: IAIService;

  constructor(aiService: IAIService) {
    this.aiService = aiService;
  }

  async execute(resumeText: string, jobDescription: string) {
    const prompt = `
        You are an expert technical interviewer. Based on the following resume and job description,
        generate exactly 5 interview questions that this specific candidate is highly likely to be asked.
        Include a mix of technical and behavioral questions.
        Also, generate 3 highly actionable interview tips ADDRESSED DIRECTLY TO THE CANDIDATE (using "you" and "your"). 
        These tips should help them specifically succeed in this interview based on their resume's strengths or weaknesses compared to the job description.
        
        Resume: ${resumeText}
        Job Description: ${jobDescription}

        Respond ONLY in valid JSON format with this exact structure, nothing else:
        {
            "questions": [
              {
                  "type": "technical or behavioral",
                  "question": "The Interview question",
                  "expected_answer_points": ["Key point 1", "Key point 2"]
              }
            ],
            "tips": ["tip 1", "tip 2", "tip 3"]
        }
    `;

    return await this.aiService.generateResponse(prompt);
  }
}
