import express from "express";
import {
  createBoarding,
  deleteBoarding,
  getBoardingById,
  getBoardings,
  updateBoarding,
} from "../controllers/boardingController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, authorizeRoles("admin", "landlord"), createBoarding)
  .get(getBoardings);

router
  .route("/:id")
  .get(getBoardingById)
  .put(protect, authorizeRoles("admin", "landlord"), updateBoarding)
  .delete(protect, authorizeRoles("admin", "landlord"), deleteBoarding);

export default router;
