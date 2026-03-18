import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET /api/users/me - Get the logged-in user's full profile from DB
export const getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("GET_CURRENT_USER_ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/me - Update logged-in user's name or email
export const updateCurrentUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ message: "Name cannot be empty" });
      }
      user.name = name.trim();
    }

    if (email !== undefined) {
      const emailLower = email.toLowerCase().trim();
      if (!emailLower) {
        return res.status(400).json({ message: "Email cannot be empty" });
      }
      // Check if another user already has this email
      const existingUser = await User.findOne({ email: emailLower });
      if (existingUser && String(existingUser._id) !== String(user._id)) {
        return res.status(400).json({ message: "Email is already in use by another account" });
      }
      user.email = emailLower;
    }

    await user.save();

    return res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("UPDATE_CURRENT_USER_ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/me/password - Change the logged-in user's password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "currentPassword and newPassword are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
