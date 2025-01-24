import { NextResponse } from "next/server";

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth`;
const REDIRECT_URI = `${process.env.FRONTEND_URL}/api/auth/google/callback`;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

export async function GET() {
  const url = `${GOOGLE_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;

  return NextResponse.redirect(url); // Redirect the user to Google's OAuth screen
}
