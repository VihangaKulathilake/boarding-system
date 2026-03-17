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
      enum: ["pending", "completed", "failed"],
      default: "pending",
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