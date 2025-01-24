import { NextResponse } from "next/server";
import { decodeToken } from "./lib/jwtUtils";

const publicRoutes = ["/api/auth/login", "/api/auth/signup", "/api/auth/forgot-password","/reset-password"]; // Whitelisted public routes for unauthenticated users
const protectedRoutes = ["/login", "/signup"]; // Routes that should be blocked for authenticated users

export async function middleware(request) {
  const token = request.cookies.get("authToken")?.value; // Get token from cookies
  console.log("Token found in cookies:", token ? "Yes" : "No");

  console.log("Request URL:", request.nextUrl.pathname);

  // Allow access to public routes (login, signup, etc.) for unauthenticated users
  if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (token) {
      console.log("User is authenticated, redirecting from public route to home page.");
      // Redirect authenticated users away from login/signup pages to home page or another route
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("Public route accessed. Allowing access:", request.nextUrl.pathname);
    return NextResponse.next();
  }

  // Block access to login and signup routes for authenticated users
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (token) {
      console.log("Authenticated user trying to access a restricted route (login/signup). Redirecting to home.");
      return NextResponse.redirect(new URL("/", request.url)); // Redirect authenticated users from login/signup routes
    }
  }

  // Check if token exists
  if (!token) {
    console.warn("No token found. Redirecting to login page.");
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect unauthenticated users to login
  }

  try {
    // Decode and verify the JWT token using the utility function
    const decoded = await decodeToken(token);
    console.log("JWT verified successfully. Decoded payload:", decoded);

    // Proceed to the next middleware or route if the token is valid
    return NextResponse.next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    console.warn("Redirecting to login due to invalid token.");
    // Redirect to login if token verification fails
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|login|signup|forgot-password|_next/static|_next/image|favicon.ico).*)", // Protect all routes except public ones
  ],
};
