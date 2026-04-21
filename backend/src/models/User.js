import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "landlord", "tenant"],
      default: "tenant",
    },
    phone: {
      type: String,
      trim: true,
    },
    score: {
      type: Number,
      default: 100,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      trim: true
    },
    preferences: {
      preferredCities: [String],
      minPrice: Number,
      maxPrice: Number,
      requiredFacilities: [String],
      preferredType: {
        type: String,
        enum: ["room_based", "full_property", "any"],
        default: "any"
      }
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
