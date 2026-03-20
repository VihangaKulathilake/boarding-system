import express from "express";
import {
    createBooking,
    deleteBooking,
    getBookingById,
    getBookings,
    updateBookingStatus,
} from "../controllers/bookingController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(protect, authorizeRoles("admin", "landlord"), createBooking)
    .get(protect, getBookings);

router
    .route("/:id")
    .get(getBookingById)
    .put(protect, authorizeRoles("admin", "landlord"), updateBookingStatus)
    .delete(protect, authorizeRoles("admin", "landlord"), deleteBooking);

export default router;