import { OllamaService } from "../../infrastructure/ai/OllamaService";
import { AnalyzeResume } from "../../use-cases/AnalyzeResume";
import { PdfReader } from "pdfreader";

// Dependency Initilize
const aiService = new OllamaService();
const analyzeUseCase = new AnalyzeResume(aiService);

const extractTextFromPDF = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    let text = "";
    new PdfReader().parseBuffer(buffer, (err: any, item: any) => {
      if (err) reject(err);
      else if (!item)
        resolve(text); // null item means end of document
      else if (item.text) text += item.text + " ";
    });
  });
};

export const analyzeResume = async (req: any, res: any) => {
  try {
    const jobDescription = req.body.jobDescription;
    if (!jobDescription) {
      return res.status(400).json({ error: "No Job description provided!" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded!" });
    }

    // 1. Parse PDF
    console.log("Extracting Text from PDF...");
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText.trim()) {
      return res
        .status(400)
        .json({ error: "Could not extract text. is this an image-based PDF?" });
    }

    // 2. Execute the analyze
    console.log("AI Analysis Executing (this may take a minute)...");
    const result = await analyzeUseCase.execute(resumeText, jobDescription);
    console.log("Analysis Complete!");
    // 3. Return the result
    res.json({
      success: true,
      data: result,
      raw_text_preview: resumeText.slice(0, 200) + "...",
      resumeText: resumeText,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
