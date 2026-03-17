import express from "express";
import { uploadImages } from "../controllers/uploadController.js";
import upload from "../utils/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to handle multiple image uploads (limit to 5 images)
router.post("/", protect, upload.array("images", 5), uploadImages);

export default router;
