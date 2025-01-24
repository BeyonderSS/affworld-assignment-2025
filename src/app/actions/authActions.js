"use server";

import dbConnect from "@/lib/dbConnect"; // Database connection utility
import { decodeToken } from "@/lib/jwtUtils"; // Token decoding utility
import User from "@/models/User"; // User model
import { cookies } from "next/headers"; // Next.js headers utility for cookies

// Function to get session data in server components
export const getSession = async () => {
  const cookieStore = cookies(); // Get cookie store

  try {
    // Connect to the database
    await dbConnect();

    // Get the token from cookies
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      console.warn("No token found in cookies.");
      throw new Error("Authentication token is missing.");
    }

    // Decode the token to extract user information
    const decoded = await decodeToken(token);

    if (!decoded || !decoded.userId) {
      console.warn("Token is invalid or user ID is missing in the decoded payload.");
      throw new Error("Invalid or malformed authentication token.");
    }

    // Find the user in the database using the decoded userId
    const user = await User.findById(decoded.userId).select("-password"); // Exclude the password field

    if (!user) {
      console.warn(`User with ID ${decoded.userId} not found.`);
      throw new Error("User not found.");
    }

    // Return user data
    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    // Log detailed error information
    console.error("Error fetching session data:", error.message);

    // Throw specific error messages based on the issue
    if (error.message.includes("Authentication token")) {
      throw new Error("Authentication required. Please log in.");
    } else if (error.message.includes("User not found")) {
      throw new Error("User does not exist. Please contact support.");
    } else if (error.message.includes("Invalid or malformed")) {
      throw new Error("Session token is invalid. Please log in again.");
    } else {
      throw new Error("An unexpected error occurred while fetching session data.");
    }
  }
};
