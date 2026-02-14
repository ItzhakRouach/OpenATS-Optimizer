import express from "express";
import { analyzeResume } from "../controllers/analyzeController";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
