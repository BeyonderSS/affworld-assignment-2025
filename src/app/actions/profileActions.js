"use server";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

/**
 * Updates a user's profile information.
 *
 * @param {Object} data - The data to update.
 * @param {string} data.userId - The unique identifier of the user (e.g., MongoDB ObjectId).
 * @param {string} [data.name] - The updated name of the user (optional).
 * @param {string} [data.email] - The updated email of the user (optional).
 * @param {string} [data.profilePictureUrl] - The updated profile picture URL (optional).
 * @returns {Object} The updated user document or an error message.
 */
export async function updateUserProfile({ userId, name, email, profilePictureUrl }) {
  try {
    // Connect to the database
    await dbConnect();

    // Find the user by their unique identifier and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(profilePictureUrl && { profilePictureUrl }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return { success: false, message: "User not found." };
    }

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser)) };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "An error occurred while updating the profile." };
  }
}
