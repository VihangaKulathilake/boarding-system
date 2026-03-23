import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    boarding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boarding",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    method: {
      type: String,
      enum: ["cash", "paypal", "unknown"],
      default: "unknown",
    },

    metadata: {
      type: Object,
      default: {},
    },

    transactionId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;