import { NextResponse } from "next/server";
import { decodeToken } from "./lib/jwtUtils";

const publicRoutes = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/reset-password",
]; // Whitelisted public routes for unauthenticated users
const protectedRoutes = ["/login", "/signup"]; // Routes that should be blocked for authenticated users

export async function middleware(request) {
  const token = request.cookies.get("authToken")?.value; // Get token from cookies

  // Allow access to public routes (login, signup, etc.) for unauthenticated users
  if (publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (token) {
      // Redirect authenticated users away from login/signup pages to home page or another route
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Block access to login and signup routes for authenticated users
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect authenticated users from login/signup routes
    }
  }

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect unauthenticated users to login
  }

  try {
    // Decode and verify the JWT token using the utility function
    const decoded = await decodeToken(token);

    // Proceed to the next middleware or route if the token is valid
    return NextResponse.next();
  } catch (err) {
    // Redirect to login if token verification fails
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|login|signup|forgot-password|api/uploadthing|_next/static|_next/image|favicon.ico).*)", // Protect all routes except public ones and /api/uploadthing
  ],
};
