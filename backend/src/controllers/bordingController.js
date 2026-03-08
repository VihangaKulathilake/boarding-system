import mongoose from "mongoose";
import Boarding from "../models/boarding.js";
import { isAdmin, isOwnerOrAdmin } from "../utils/authHelpers.js";
import { normalizeStringArray } from "../utils/stringHelpers.js";

export const registerBoarding = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      city,
      price,
      rooms,
      facilities,
      images,
      owner,
      status,
    } = req.body;

    if (!title || !description || !address || !city || price === undefined || rooms === undefined) {
      return res.status(400).json({
        message: "title, description, address, city, price and rooms are required",
      });
    }

    const resolvedOwner = req.user?.id || owner;
    if (!resolvedOwner) {
      return res.status(400).json({ message: "owner is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(resolvedOwner)) {
      return res.status(400).json({ message: "Invalid owner id" });
    }

    const parsedPrice = Number(price);
    const parsedRooms = Number(rooms);

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ message: "price must be a valid non-negative number" });
    }

    if (Number.isNaN(parsedRooms) || parsedRooms <= 0) {
      return res.status(400).json({ message: "rooms must be a valid number greater than 0" });
    }

    const nextStatus = isAdmin(req.user) && status ? status : "pending";

    const boarding = await Boarding.create({
      title,
      description,
      address,
      city,
      price: parsedPrice,
      rooms: parsedRooms,
      facilities: normalizeStringArray(facilities) || [],
      images: normalizeStringArray(images) || [],
      owner: resolvedOwner,
      status: nextStatus,
    });

    const populatedBoarding = await boarding.populate("owner", "name email role");

    return res.status(201).json({
      message: "Boarding registered successfully",
      boarding: populatedBoarding,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createBoarding = registerBoarding;

export const getBoardings = async (req, res) => {
  try {
    const { q, city, minPrice, maxPrice, rooms, status, owner, mine } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
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

    if (rooms !== undefined && !Number.isNaN(Number(rooms))) {
      filter.rooms = Number(rooms);
    }

    if (status) {
      if (isAdmin(req.user)) {
        filter.status = status;
      } else {
        filter.status = "approved";
      }
    } else if (!isAdmin(req.user)) {
      filter.status = "approved";
    }

    if (mine === "true" && req.user?.id) {
      filter.owner = req.user.id;
    } else if (owner && mongoose.Types.ObjectId.isValid(owner)) {
      filter.owner = owner;
    }

    const boardings = await Boarding.find(filter)
      .populate("owner", "name email role")
      .sort({ createdAt: -1 });

    return res.json(boardings);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

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

    return res.json(boarding);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

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

    const allowedFields = ["title", "description", "address", "city", "price", "rooms", "facilities", "images"];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === "facilities" || field === "images") {
          boarding[field] = normalizeStringArray(req.body[field]) || [];
        } else if (field === "price" || field === "rooms") {
          const numValue = Number(req.body[field]);
          if (Number.isNaN(numValue)) {
            return res.status(400).json({ message: `${field} must be a number` });
          }
          if (field === "price" && numValue < 0) {
            return res.status(400).json({ message: "price must be non-negative" });
          }
          if (field === "rooms" && numValue <= 0) {
            return res.status(400).json({ message: "rooms must be greater than 0" });
          }
          boarding[field] = numValue;
        } else {
          boarding[field] = req.body[field];
        }
      }
    }

    if (req.body.status !== undefined) {
      if (!isAdmin(req.user)) {
        return res.status(403).json({ message: "Only admins can update status" });
      }
      boarding.status = req.body.status;
    }

    await boarding.save();
    await boarding.populate("owner", "name email role");

    return res.json({
      message: "Boarding updated successfully",
      boarding,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

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
    return res.status(500).json({ message: "Server error" });
  }
};
