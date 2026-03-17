import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoomsByBoarding,
  updateRoom,
} from "../controllers/roomController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/boardings/:boardingId")
  .post(protect, authorizeRoles("admin", "landlord"), createRoom)
  .get(getRoomsByBoarding);

router
  .route("/:id")
  .put(protect, authorizeRoles("admin", "landlord"), updateRoom)
  .delete(protect, authorizeRoles("admin", "landlord"), deleteRoom);

export default router;
