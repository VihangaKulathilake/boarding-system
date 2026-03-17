import mongoose from "mongoose";
import Boarding from "../models/boarding.js";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import Payment from "../models/payment.js";
import { isAdmin, isOwnerOrAdmin } from "../utils/authHelpers.js";     

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { boardingId, roomId, checkInDate, durationMonths, tenantId } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!boardingId || !mongoose.Types.ObjectId.isValid(boardingId)) {
      return res.status(400).json({ message: "Valid boardingId is required" });
    }

    const parsedCheckIn = new Date(checkInDate);
    if (!checkInDate || Number.isNaN(parsedCheckIn.getTime())) {
      return res.status(400).json({ message: "Valid checkInDate is required" });
    }

    const parsedDuration = durationMonths !== undefined ? Number(durationMonths) : 1;
    if (Number.isNaN(parsedDuration) || parsedDuration <= 0) {
      return res.status(400).json({ message: "durationMonths must be a number greater than 0" });
    }

    const boarding = await Boarding.findById(boardingId);
    if (!boarding) {
      return res.status(404).json({ message: "Boarding not found" });
    }

    if (boarding.status !== "approved" && !isOwnerOrAdmin(req.user, boarding.owner)) {
      return res.status(403).json({ message: "Boarding is not available for booking" });
    }

    let room = null;
    if (boarding.type === "room_based") {
      if (!roomId) {
        return res.status(400).json({ message: "roomId is required for room_based boarding" });
      }

      if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ message: "Invalid roomId" });
      }

      room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      if (String(room.boarding) !== String(boardingId)) {
        return res.status(400).json({ message: "Room does not belong to this boarding" });
      }

      if (!room.available) {
        return res.status(409).json({ message: "Room is not available" });
      }

      const existingBooking = await Booking.findOne({
        room: roomId,
        status: { $in: ["pending", "approved"] },
      });

      if (existingBooking) {
        return res.status(409).json({ message: "Room already has an active booking" });
      }
    } else if (boarding.type === "full_property") {
      if (roomId) {
        return res.status(400).json({ message: "roomId is not allowed for full_property boarding" });
      }

      if (boarding.price === undefined || Number.isNaN(Number(boarding.price))) {
        return res.status(400).json({ message: "Boarding price is not available" });
      }
    } else {
      return res.status(400).json({ message: "Invalid boarding type" });
    }

    const resolvedTenantId = isAdmin(req.user) && tenantId ? tenantId : req.user.id;
    if (!mongoose.Types.ObjectId.isValid(resolvedTenantId)) {
      return res.status(400).json({ message: "Invalid tenant id" });
    }

    const basePrice = boarding.type === "room_based" ? room.price : boarding.price;
    const totalAmount = Number(basePrice) * parsedDuration;

    const payment = await Payment.create({
      boarding: boardingId,
      user: resolvedTenantId,
      amount: totalAmount,
      status: "pending",
    });

    const booking = await Booking.create({
      tenant: resolvedTenantId,
      boarding: boardingId,
      room: room?._id,
      checkInDate: parsedCheckIn,
      durationMonths: parsedDuration,
      status: "pending",
      payment: payment._id,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("tenant", "name email role")
      .populate("boarding")
      .populate("room")
      .populate("payment");

    return res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error while creating booking" });
  }
};

// Get bookings based on role
export const getBookings = async (req, res) => {
  try {
    const { status, boardingId, roomId, tenantId } = req.query;

    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (boardingId && mongoose.Types.ObjectId.isValid(boardingId)) {
      filter.boarding = boardingId;
    }

    if (roomId && mongoose.Types.ObjectId.isValid(roomId)) {
      filter.room = roomId;
    }

    if (isAdmin(req.user)) {
      if (tenantId && mongoose.Types.ObjectId.isValid(tenantId)) {
        filter.tenant = tenantId;
      }
    } else if (req.user.role === "landlord") {
      const ownedBoardings = await Boarding.find({ owner: req.user.id }).select("_id");
      const ownedIds = ownedBoardings.map((b) => b._id);
      filter.boarding = { $in: ownedIds };
    } else {
      filter.tenant = req.user.id;
    }

    const bookings = await Booking.find(filter)
      .populate("tenant", "name email role")
      .populate("boarding")
      .populate("room")
      .populate("payment")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

// Get a single booking by id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id)
      .populate("tenant", "name email role")
      .populate("boarding")
      .populate("room")
      .populate("payment");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isTenant = String(booking.tenant?._id || booking.tenant) === String(req.user?.id);
    const isOwner = isOwnerOrAdmin(req.user, booking.boarding?.owner || booking.boarding);

    if (!isTenant && !isOwner && !isAdmin(req.user)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Server error while fetching booking" });
  }
};

// Update booking status (approve/reject/cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    if (!status || !["pending", "approved", "rejected", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findById(id).populate("boarding").populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isTenant = String(booking.tenant) === String(req.user?.id);
    const isOwner = isOwnerOrAdmin(req.user, booking.boarding?.owner || booking.boarding);

    if (["approved", "rejected"].includes(status) && !isOwner && !isAdmin(req.user)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (status === "cancelled" && !isTenant && !isOwner && !isAdmin(req.user)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (status === "approved" && booking.room) {
      const room = await Room.findById(booking.room);
      if (room && !room.available) {
        return res.status(409).json({ message: "Room is no longer available" });
      }
      if (room) {
        room.available = false;
        await room.save();
      }
    }

    if (["rejected", "cancelled"].includes(status) && booking.room) {
      const room = await Room.findById(booking.room);
      if (room) {
        room.available = true;
        await room.save();
      }
    }

    booking.status = status;
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("tenant", "name email role")
      .populate("boarding")
      .populate("room")
      .populate("payment");

    return res.json({
      message: "Booking status updated",
      booking: populatedBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error while updating booking" });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findById(id).populate("boarding");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const isTenant = String(booking.tenant) === String(req.user?.id);
    const isOwner = isOwnerOrAdmin(req.user, booking.boarding?.owner || booking.boarding);

    if (!isTenant && !isOwner && !isAdmin(req.user)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await booking.deleteOne();
    return res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error while deleting booking" });
  }
};
