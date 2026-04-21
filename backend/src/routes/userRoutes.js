import express from "express";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  changePassword,
  getUsers,
  adminGetUserById,
  updateUserPreferences
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/:id", protect, authorizeRoles("admin"), adminGetUserById);

// /api/users/me
router.get("/me", protect, getCurrentUserProfile);
router.put("/me", protect, updateCurrentUserProfile);
router.put("/me/password", protect, changePassword);
router.put("/me/preferences", protect, updateUserPreferences);

export default router;
