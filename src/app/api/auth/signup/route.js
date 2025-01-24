import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { encodeToken } from "@/lib/jwtUtils";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse request body
    const { name, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 400 }
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, passwordHash });
    await user.save();

    // Generate a token using the utility function
    const token = await encodeToken({ userId: user._id, email: user.email });

    // Create the response and set the token in the cookies
    const response = NextResponse.json({
      success: true,
      message: "Signup successful!",
    });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error in signup route:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
