import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Email (unique)
  passwordHash: { type: String }, // Hashed password for local login
  googleId: { type: String }, // Google OAuth ID
  profilePictureUrl: { type: String }, // Profile picture URL (optional)
  createdAt: { type: Date, default: Date.now }, // User creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Last update timestamp
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
