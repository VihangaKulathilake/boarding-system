import express from "express";
import {
    createPayment,
    getPaymentById,
    getPayments,
    updatePaymentStatus,
} from "../controllers/paymentController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(protect, createPayment)
    .get(protect, getPayments);

router
    .route("/:id")
    .get(protect, getPaymentById)
    .put(protect, authorizeRoles("admin", "landlord"), updatePaymentStatus);

export default router;
