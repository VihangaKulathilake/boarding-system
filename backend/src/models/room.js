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
    
    description: {
      type: String,
      default: ""
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

roomSchema.index({ boarding: 1 });
roomSchema.index({ available: 1 });

export default mongoose.model("Room", roomSchema);