
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // Required for manual login
  googleId: { type: String }, // Google OAuth ID
  profilePictureUrl: { type: String }, // Profile picture URL (optional)
  resetPasswordToken: { type: String, default: null }, // Password reset token
  resetPasswordExpires: { type: Date, default: null }, // Expiration time for reset token
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
