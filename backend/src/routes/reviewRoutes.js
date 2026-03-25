import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createReview, getReviews, getReviewById, getReviewsByBoardingId, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router
    .route("/")
    .post(protect, createReview)
    .get(getReviews);
router
    .route("/:id")
    .get(getReviewById)
    .put(protect, updateReview)
    .delete(protect, deleteReview);
router
    .route("/boarding/:id")
    .get(getReviewsByBoardingId);

export default router;