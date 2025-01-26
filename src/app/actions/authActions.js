"use server";

import dbConnect from "@/lib/dbConnect"; // Database connection utility
import { decodeToken } from "@/lib/jwtUtils"; // Token decoding utility
import User from "@/models/User"; // User model
import { cookies } from "next/headers"; // Next.js headers utility for cookies

// Function to get session data in server components
export const getSession = async () => {
  const cookieStore =await cookies(); // Get cookie store

  try {
    // Connect to the database
    await dbConnect();

    // Get the token from cookies
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      console.warn("No token found in cookies.");
      return { error: "Authentication token is missing." }; // Return error message
    }

    // Decode the token to extract user information
    const decoded = await decodeToken(token);

    if (!decoded || !decoded.userId) {
      console.warn("Token is invalid or user ID is missing in the decoded payload.");
      return { error: "Invalid or malformed authentication token." }; // Return error message
    }

    // Find the user in the database using the decoded userId
    const user = await User.findById(decoded.userId).select("-password"); // Exclude the password field

    if (!user) {
      console.warn(`User with ID ${decoded.userId} not found.`);
      return { error: "User not found." }; // Return error message
    }

    // Return user data
    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    // Log detailed error information
    console.error("Error fetching session data:", error.message);

    // Return generic error message
    return { error: "An unexpected error occurred while fetching session data." };
  }
};
