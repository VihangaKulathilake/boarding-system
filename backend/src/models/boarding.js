import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema(
  {
    boardingName: {
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

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    type: {
      type: String,
      enum: ["room_based", "full_property"],
      required: true,
    },

    price: {
      type: Number,
      required: function () {
        return this.type === "full_property";
      },
      min: 0,
    },

    totalRooms: {
      type: Number,
      min: 1,
      required: function () {
        return this.type === "full_property";
      },
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
