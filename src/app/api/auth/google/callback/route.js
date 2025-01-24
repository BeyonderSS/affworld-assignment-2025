import { NextResponse } from "next/server";
import { google } from "googleapis"; // Import googleapis
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { encodeToken } from "@/lib/jwtUtils"; // Import custom encodeToken utility

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.FRONTEND_URL}/api/auth/google/callback`;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // Create OAuth2 client

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Authorization code not found in request URL.");
    return NextResponse.json({ success: false, message: "Authorization code not found." }, { status: 400 });
  }

  try {
    console.log("Exchanging authorization code for access token...");
    // Exchange authorization code for access token using googleapis library
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("Token response:", tokens);

    // Set credentials
    oAuth2Client.setCredentials(tokens);

    // Get user info from Google using the access token
    const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
    const userInfo = await oauth2.userinfo.get();
    console.log("User info response:", userInfo.data);

    const { id: googleId, email, name, picture } = userInfo.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      console.log("Creating new user...");
      // Create a new user if not found
      user = new User({ name, email, googleId, profilePictureUrl: picture });
      await user.save();
    } else if (!user.googleId) {
      console.log("Linking Google account to existing user...");
      // Link Google account if user exists but not linked
      user.googleId = googleId;
      await user.save();
    }

    // Create a token for the session using encodeToken
    const token = await encodeToken({ userId: user._id, email: user.email });

    console.log("JWT Token generated:", token);

    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful! Redirecting in 1 second...",
    });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Simulate a 5-second delay before the client-side redirection
    response.headers.set("Refresh", "1;url=/"); // Delay for 1 second, then redirect to `/`

    console.log("Cookie set, and refresh header applied for delayed redirection.");
    return response;
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    return NextResponse.json({ success: false, message: "Google login failed." }, { status: 500 });
  }
}
