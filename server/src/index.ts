import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { PdfReader } from "pdfreader";
import { OllamaService } from "./infrastructure/ai/OllamaService";
import { AnalyzeResume } from "./use-cases/AnalyzeResume";

const app = express();
const upload = multer(); // Handle file upload in memory

app.use(cors());
app.use(express.json());

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

app.post("/analyze", upload.single("resume"), async (req: any, res: any) => {
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
    const result = await analyzeUseCase.execute(resumeText, jobDescription);

    // 3. Return the result
    res.json({
      success: true,
      data: result,
      raw_text_preview: resumeText.slice(0, 200) + "...",
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
