import { NextResponse } from "next/server";

export async function POST() {
  // Clear the authToken cookie
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });

  // Set the authToken cookie with an immediate expiry
  response.cookies.set("authToken", "", { httpOnly: true, secure: true, sameSite: "strict", maxAge: 0 });

  // Add a refresh header to force a reload that triggers middleware
  response.headers.set("Refresh", "0;url=/login");

  return response;
}
