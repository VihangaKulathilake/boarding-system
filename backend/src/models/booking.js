import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    boarding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boarding",
      required: true
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: false
    },

    checkInDate: {
      type: Date,
      required: true
    },

    durationMonths: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "cancelled"],
      default: "pending"
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment"
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.index({ boarding: 1 });
bookingSchema.index({ status: 1 });

export default mongoose.model("Booking", bookingSchema);