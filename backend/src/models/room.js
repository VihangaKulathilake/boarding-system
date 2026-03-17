import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    boarding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boarding",
      required: true
    },

    roomNumber: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    available: {
      type: Boolean,
      default: true
    },

    facilities: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Room", roomSchema);