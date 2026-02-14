import { Request, Response } from "express";
import { OllamaService } from "../ai/OllamaService";
import { GenerateInterview } from "../../use-cases/GenerateInterview";

// Dependency Initilize
const aiService = new OllamaService();
const interviewUseCase = new GenerateInterview(aiService);

export const generateInterviewQuestions = async (
  req: Request,
  res: Response,
) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "No job description provided! " });
    }
    if (!resumeText) {
      return res.status(400).json({ error: "No resume provided!" });
    }

    console.log("Generating Personal Interview Questions and Tips....");
    // execute the business logic
    const result = await interviewUseCase.execute(resumeText, jobDescription);

    res.json({
      success: true,
      data: result,
    });
    console.log("Personal interview has been generated!");
  } catch (err: any) {
    console.log("Interview Generation Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to generate interview questions and tips",
    });
  }
};
