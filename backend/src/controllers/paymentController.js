import mongoose from "mongoose";
import Payment from "../models/payment.js";
import Booking from "../models/booking.js";
import Boarding from "../models/boarding.js";
import Room from "../models/room.js";
import { isAdmin, isOwnerOrAdmin } from "../utils/authHelpers.js";
import { PaymentContext, StrategyFactory } from "../services/payment/PaymentStrategy.js";

// Create a new payment (manual record or gateway)
export const createPayment = async (req, res) => {
    try {
        const { bookingId, amount, transactionId, status, gateway } = req.body;

        if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: "Valid bookingId is required" });
        }

        const booking = await Booking.findById(bookingId).populate("boarding");
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Only tenant or landlord/admin can record payment
        const isTenant = String(booking.tenant) === String(req.user.id);
        const isOwner = isOwnerOrAdmin(req.user, booking.boarding?.owner);

        if (!isTenant && !isOwner && !isAdmin(req.user)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const paymentData = {
            boarding: booking.boarding._id,
            user: booking.tenant,
            amount: amount || booking.payment?.amount, // Default to booking amount if not provided
            transactionId,
            status: status || "pending",
        };

        // Initialize Strategy Design Pattern Context
        const strategy = StrategyFactory.getStrategy(gateway);
        const paymentContext = new PaymentContext(strategy);

        // Execute payment strategy and capture its tailored response
        const strategyResult = await paymentContext.executePayment(paymentData);

        // Link payment to booking
        booking.payment = strategyResult.payment._id;
        await booking.save();

        return res.status(201).json({
            message: `Payment initiated successfully using ${gateway || 'cash'} strategy`,
            ...strategyResult
        });
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ message: "Server error while creating payment" });
    }
};

// Get payments with filters
export const getPayments = async (req, res) => {
    try {
        const { status, userId, boardingId } = req.query;
        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (isAdmin(req.user)) {
            if (userId && mongoose.Types.ObjectId.isValid(userId)) {
                filter.user = userId;
            }
            if (boardingId && mongoose.Types.ObjectId.isValid(boardingId)) {
                filter.boarding = boardingId;
            }
        } else if (req.user.role === "landlord") {
            const ownedBoardings = await Boarding.find({ owner: req.user.id }).select("_id");
            const ownedIds = ownedBoardings.map(b => b._id);
            filter.boarding = { $in: ownedIds };
            if (userId && mongoose.Types.ObjectId.isValid(userId)) {
                filter.user = userId;
            }
        } else {
            // Tenant
            filter.user = req.user.id;
        }

        const payments = await Payment.find(filter)
            .populate("user", "name email")
            .populate("boarding", "boardingName address")
            .sort({ createdAt: -1 });

        return res.json(payments);
    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching payments" });
    }
};

// Get payment by id
export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid payment id" });
        }

        const payment = await Payment.findById(id)
            .populate("user", "name email")
            .populate("boarding", "boardingName address");

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        const isOwner = isOwnerOrAdmin(req.user, payment.boarding?.owner);
        const isUser = String(payment.user?._id || payment.user) === String(req.user.id);

        if (!isUser && !isOwner && !isAdmin(req.user)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        return res.json(payment);
    } catch (error) {
        return res.status(500).json({ message: "Server error while fetching payment" });
    }
};

// Update payment status (admin/landlord only)
export const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid payment id" });
        }

        if (!status || !["pending", "completed", "failed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const payment = await Payment.findById(id).populate("boarding");
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        const isOwner = isOwnerOrAdmin(req.user, payment.boarding?.owner);

        if (!isOwner && !isAdmin(req.user)) {
            return res.status(403).json({ message: "Forbidden. Only landlord or admin can update status." });
        }

        payment.status = status;
        await payment.save();

        // Automatically synchronize the associated Request/Booking
        const booking = await Booking.findOne({ payment: id });
        if (booking) {
            if (status === 'completed') {
                booking.status = 'approved';
                // Lock the room capacity
                if (booking.room) {
                    const room = await Room.findById(booking.room);
                    if (room && room.available) {
                        room.available = false;
                        await room.save();
                    }
                }
            } else if (status === 'failed') {
                booking.status = 'rejected';
                // Release the room capacity
                if (booking.room) {
                    const room = await Room.findById(booking.room);
                    if (room && !room.available) {
                        room.available = true;
                        await room.save();
                    }
                }
            }
            await booking.save();
        }

        return res.json({
            message: "Payment status updated successfully",
            payment,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error while updating payment status" });
    }
};
