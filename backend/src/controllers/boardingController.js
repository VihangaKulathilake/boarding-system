import mongoose from "mongoose";
import Boarding from "../models/boarding.js";
import Room from "../models/room.js";
import User from "../models/User.js";
import Payment from "../models/payment.js";
import Booking from "../models/booking.js";
import { isAdmin, isOwnerOrAdmin } from "../utils/authHelpers.js";
import { normalizeStringArray } from "../utils/formatHelpers.js";

// Create a new boarding
export const createBoarding = async (req, res) => {
  try {
    const {
      boardingName,
      description,
      address,
      city,
      type,
      price,
      totalRooms,
      rooms, // Expecting an array of room objects for room_based
      facilities,
      images,
      location,
      owner,
      status,
    } = req.body;

    if (!boardingName || !description || !address || !city || !type || !location) {
      return res.status(400).json({
        message: "boardingName, description, address, city, type, and location are required",
      });
    }

    if (!["room_based", "full_property"].includes(type)) {
      return res.status(400).json({ message: "type must be room_based or full_property" });
    }

    const resolvedOwner = req.user?.id || owner;
    if (!resolvedOwner) {
      return res.status(400).json({ message: "owner is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(resolvedOwner)) {
      return res.status(400).json({ message: "Invalid owner id" });
    }

    const parsedPrice = price !== undefined ? Number(price) : undefined;
    const parsedTotalRooms = totalRooms !== undefined ? Number(totalRooms) : undefined;

    if (price !== undefined && (Number.isNaN(parsedPrice) || parsedPrice < 0)) {
      return res.status(400).json({ message: "price must be a valid non-negative number" });
    }

    if (type === "full_property") {
      if (price === undefined) {
        return res.status(400).json({ message: "price is required for full_property" });
      }
      if (totalRooms === undefined) {
        return res.status(400).json({ message: "totalRooms is required for full_property" });
      }
      if (Number.isNaN(parsedTotalRooms) || parsedTotalRooms <= 0) {
        return res.status(400).json({ message: "totalRooms must be a valid number greater than 0" });
      }
    }

    if (type === "room_based" && (!rooms || !Array.isArray(rooms) || rooms.length === 0)) {
      return res.status(400).json({ message: "At least one room definition is required for room_based boardings" });
    }

    const nextStatus = isAdmin(req.user) && status ? status : "pending";

    const boardingData = {
      boardingName,
      description,
      address,
      city,
      type,
      facilities: normalizeStringArray(facilities) || [],
      images: normalizeStringArray(images) || [],
      owner: resolvedOwner,
      status: nextStatus,
    };

    if (location && Array.isArray(location.coordinates) && location.coordinates.length === 2) {
      boardingData.location = {
        type: "Point",
        coordinates: [Number(location.coordinates[0]), Number(location.coordinates[1])],
      };
    } else {
      return res.status(400).json({ message: "Invalid location coordinates. Latitude and Longitude are required." });
    }

    if (type === "full_property") {
      boardingData.price = parsedPrice;
      boardingData.totalRooms = parsedTotalRooms;
    }

    console.log("CREATING_BOARDING_WITH_DATA:", JSON.stringify(boardingData, null, 2));

    let boarding;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      boarding = new Boarding(boardingData);
      await boarding.save({ session });

      if (type === "room_based" && rooms && Array.isArray(rooms)) {
        const roomsData = rooms.map(room => ({
          boarding: boarding._id,
          roomNumber: room.roomNumber,
          description: room.description || "",
          price: Number(room.price),
          capacity: Number(room.capacity),
          facilities: normalizeStringArray(room.facilities) || [],
          images: normalizeStringArray(room.images) || [],
          available: true
        }));

        await Room.insertMany(roomsData, { session });
        
        // Update totalRooms
        boarding.totalRooms = roomsData.length;
        await boarding.save({ session });
      }

      await session.commitTransaction();
    } catch (saveError) {
      await session.abortTransaction();
      console.error("BOARDING_SAVE_ERROR:", saveError);
      return res.status(400).json({
        message: "Failed to save boarding or rooms. Validation error.",
        error: saveError.message
      });
    } finally {
      session.endSession();
    }

    const populatedBoarding = await Boarding.findById(boarding._id).populate("owner", "name email role");

    return res.status(201).json({
      message: "Boarding registered successfully",
      boarding: populatedBoarding,
    });
  } catch (error) {
    console.error("CREATE_BOARDING_UNEXPECTED_ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all boardings with optional filters
export const getBoardings = async (req, res) => {
  try {

    // Extract query parameters for filtering
    const { q, city, minPrice, maxPrice, rooms, totalRooms, status, owner, mine } = req.query;

    // Build the filter object based on provided query parameters
    const filter = {};

    if (q) {
      filter.$or = [
        { boardingName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
        { city: { $regex: q, $options: "i" } },
      ];
    }

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      // isNaN check is important to avoid adding invalid price filters that would exclude all results
      if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
        filter.price.$lte = Number(maxPrice);
      }
      if (Object.keys(filter.price).length === 0) {
        delete filter.price;
      }
    }

    if (totalRooms !== undefined && !Number.isNaN(Number(totalRooms))) {
      filter.totalRooms = Number(totalRooms);
    }

    // Filter by status - only admins can filter by specific status, regular users only see approved boardings
    if (status) {
      if (isAdmin(req.user)) {
        filter.status = status;
      } else {
        filter.status = "approved";
      }
    }
    // If no status filter is provided, regular users should only see approved boardings
    // UNLESS they are filtering for their own boardings (mine=true)
    else if (!isAdmin(req.user) && mine !== "true") {
      filter.status = "approved";
    }

    // If mine=true, filter by current user's boardings. Otherwise, if owner is provided, filter by that owner.
    if (mine === "true" && req.user?.id) {
      filter.owner = req.user.id;
    } else if (owner && mongoose.Types.ObjectId.isValid(owner)) {
      filter.owner = owner;
    }

    // Fetch boardings based on the constructed filter, populate owner details, and sort by creation date
    const boardings = await Boarding.find(filter)
      .populate("owner", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    const roomBasedIds = boardings
      .filter((boarding) => boarding.type === "room_based")
      .map((boarding) => boarding._id);

    let roomStatsByBoarding = new Map();
    if (roomBasedIds.length > 0) {
      const stats = await Room.aggregate([
        { $match: { boarding: { $in: roomBasedIds } } },
        {
          $group: {
            _id: "$boarding",
            totalRooms: { $sum: 1 },
            availableRooms: {
              $sum: { $cond: [{ $eq: ["$available", true] }, 1, 0] },
            },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" }
          },
        },
      ]);

      roomStatsByBoarding = new Map(
        stats.map((stat) => [
          String(stat._id),
          { 
            totalRooms: stat.totalRooms, 
            availableRooms: stat.availableRooms,
            minPrice: stat.minPrice,
            maxPrice: stat.maxPrice 
          },
        ])
      );
    }

    // For full_property type, we need to check for active bookings to determine availability
    const fullPropertyIds = boardings
      .filter((boarding) => boarding.type === "full_property")
      // get all the full_property boardings id's only
      .map((boarding) => boarding._id);

    // Create an empty map to store the active bookings count for each full_property boarding
    let fullPropertyActiveBookings = new Map();
    if (fullPropertyIds.length > 0) {

      // aggregate() does the same thing as find() but with more features
      const activeBookings = await Booking.aggregate([
        {

          // match the full_property boardings id's only
          $match: {
            // match the pending and approved status only
            boarding: { $in: fullPropertyIds },
            status: { $in: ["pending", "approved"] }
          }
        },

        // group the full_property boardings id's only and count the number of active bookings
        // _id: "$boarding" - group by the boarding id
        // count: { $sum: 1 } - add 1 to the count for each active booking
        { $group: { _id: "$boarding", count: { $sum: 1 } } }
      ]);

      // create a map of full_property boardings id's and their active bookings count
      fullPropertyActiveBookings = new Map(
        activeBookings.map((b) => [String(b._id), b.count])
      );
    }

    const response = boardings.map((boarding) => {
      if (boarding.type === "room_based") {
        const stats = roomStatsByBoarding.get(String(boarding._id)) || {
          totalRooms: 0,
          availableRooms: 0,
          minPrice: 0
        };
        return {
          ...boarding,
          totalRooms: stats.totalRooms,
          availableRooms: stats.availableRooms,
          price: stats.minPrice // Set price to minPrice for room_based for marketplace display
        };
      } else if (boarding.type === "full_property") {
        // get the active bookings count for the full_property boardings
        const activeBookingCount = fullPropertyActiveBookings.get(String(boarding._id)) || 0;
        return {
          ...boarding,
          // if activeBookingCount is 0, then all rooms are available, else no rooms are available
          availableRooms: activeBookingCount === 0 ? boarding.totalRooms : 0
        };
      }
      return boarding;
    });

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a single boarding by id
export const getBoardingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid boarding id" });
    }

    const boarding = await Boarding.findById(id).populate("owner", "name email role");

    if (!boarding) {
      return res.status(404).json({ message: "Boarding not found" });
    }

    if (boarding.status !== "approved" && !isOwnerOrAdmin(req.user, boarding.owner?._id || boarding.owner)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (boarding.type === "room_based") {
      const rooms = await Room.find({ boarding: id });
      const totalRooms = rooms.length;
      const availableRooms = rooms.filter((room) => room.available).length;
      const minPrice = rooms.length > 0 ? Math.min(...rooms.map(r => r.price)) : 0;

      return res.json({
        ...boarding.toObject(),
        totalRooms,
        availableRooms,
        rooms,
        price: minPrice, // Set price to minPrice for detail view
      });
    }

    return res.json(boarding);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a boarding by id
export const updateBoarding = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid boarding id" });
    }

    const boarding = await Boarding.findById(id);
    if (!boarding) {
      return res.status(404).json({ message: "Boarding not found" });
    }

    if (!isOwnerOrAdmin(req.user, boarding.owner)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const nextType = req.body.type ?? boarding.type;
    if (!nextType || !["room_based", "full_property"].includes(nextType)) {
      return res.status(400).json({ message: "type must be room_based or full_property" });
    }

    const simpleFields = ["boardingName", "description", "address", "city"];
    for (const field of simpleFields) {
      if (req.body[field] !== undefined) {
        boarding[field] = req.body[field];
      }
    }

    if (req.body.facilities !== undefined) {
      boarding.facilities = normalizeStringArray(req.body.facilities) || [];
    }

    if (req.body.images !== undefined) {
      boarding.images = normalizeStringArray(req.body.images) || [];
    }

    if (req.body.location !== undefined) {
      const { location } = req.body;
      if (location && Array.isArray(location.coordinates) && location.coordinates.length === 2) {
        boarding.location = {
          type: "Point",
          coordinates: [Number(location.coordinates[0]), Number(location.coordinates[1])],
        };
      }
    }

    boarding.type = nextType;

    if (nextType === "full_property") {
      if (req.body.totalRooms !== undefined) {
        const parsedTotalRooms = Number(req.body.totalRooms);
        if (Number.isNaN(parsedTotalRooms) || parsedTotalRooms <= 0) {
          return res.status(400).json({ message: "totalRooms must be a valid number greater than 0" });
        }
        boarding.totalRooms = parsedTotalRooms;
      }

      if (req.body.price !== undefined) {
        const parsedPrice = Number(req.body.price);
        if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
          return res.status(400).json({ message: "price must be a valid non-negative number" });
        }
        boarding.price = parsedPrice;
      }

      if (boarding.price === undefined) {
        return res.status(400).json({ message: "price is required for full_property" });
      }

      if (boarding.totalRooms === undefined) {
        return res.status(400).json({ message: "totalRooms is required for full_property" });
      }
    } else if (nextType === "room_based") {
      boarding.price = undefined;
      boarding.totalRooms = req.body.rooms?.length || boarding.totalRooms;
    }

    if (req.body.status !== undefined) {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Only admins can update status" });
      }
      boarding.status = req.body.status;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await boarding.save({ session });

      if (nextType === "room_based" && Array.isArray(req.body.rooms)) {
        const incomingRooms = req.body.rooms;
        const existingRooms = await Room.find({ boarding: id }).session(session);

        // Identify rooms to delete
        const incomingIds = incomingRooms.map(r => r._id?.toString()).filter(Boolean);
        const roomsToDelete = existingRooms.filter(r => !incomingIds.includes(r._id.toString()));
        if (roomsToDelete.length > 0) {
          await Room.deleteMany({ _id: { $in: roomsToDelete.map(r => r._id) } }, { session });
        }

        // Identify rooms to update or create
        for (const room of incomingRooms) {
          const roomData = {
            boarding: id,
            roomNumber: room.roomNumber,
            description: room.description || "",
            price: Number(room.price),
            capacity: Number(room.capacity),
            facilities: normalizeStringArray(room.facilities) || [],
            images: normalizeStringArray(room.images) || [],
            available: room.available !== undefined ? room.available : true,
          };

          if (room._id && mongoose.Types.ObjectId.isValid(room._id)) {
            await Room.findByIdAndUpdate(room._id, roomData, { session, runValidators: true });
          } else {
            const newRoom = new Room(roomData);
            await newRoom.save({ session });
          }
        }
      }

      await session.commitTransaction();
    } catch (saveError) {
      await session.abortTransaction();
      console.error("UPDATE_BOARDING_SAVE_ERROR:", saveError);
      return res.status(400).json({
        message: "Failed to update boarding or rooms",
        error: saveError.message
      });
    } finally {
      session.endSession();
    }

    const updatedBoarding = await Boarding.findById(id).populate("owner", "name email role");

    return res.json({
      message: "Boarding updated successfully",
      boarding: updatedBoarding,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Delete a boarding by id
export const deleteBoarding = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid boarding id" });
    }

    const boarding = await Boarding.findById(id);
    if (!boarding) {
      return res.status(404).json({ message: "Boarding not found" });
    }

    if (!isOwnerOrAdmin(req.user, boarding.owner)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await boarding.deleteOne();

    return res.json({ message: "Boarding deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get platform-wide stats for admin dashboard
export const getAdminStats = async (req, res) => {
  try {
    const [landlordsCount, tenantsCount, boardingsCount, payments] = await Promise.all([
      User.countDocuments({ role: "landlord" }),
      User.countDocuments({ role: "tenant" }),
      Boarding.countDocuments(),
      Payment.find({ status: "completed" }).select("amount"),
    ]);

    const totalRevenue = payments.reduce((acc, p) => acc + (p.amount || 0), 0);

    return res.json({
      landlords: landlordsCount,
      tenants: tenantsCount,
      boardings: boardingsCount,
      revenue: totalRevenue,
    });
  } catch (error) {
    console.error("GET_ADMIN_STATS_ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
