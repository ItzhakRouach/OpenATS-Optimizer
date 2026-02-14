import express from "express";
import { analyzeResume } from "../controllers/analyzeController";
import { generateInterviewQuestions } from "../controllers/interviewController";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/analyze", upload.single("resume"), analyzeResume);
router.post("/interview", express.json(), generateInterviewQuestions);

export default router;
