import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rooms: {
      type: Number,
      required: true,
    },

    facilities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String, // store image URLs (from cloud storage like S3 / Cloudinary)
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Boarding = mongoose.model("Boarding", boardingSchema);

export default Boarding;