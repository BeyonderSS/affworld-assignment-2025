import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the authToken cookie
  const cookieStore = cookies();
  (await cookieStore).delete("authToken");

  const response = NextResponse.json({ success: true, message: "Logged out successfully,You will be redirected in 1 second" });

  // Wait 1 second and then refresh the route
  setTimeout(() => {
    // Trigger a route refresh by redirecting to the current route
    response.headers.set("Location", "/");
    response.status(302); // 302 Redirect status code
  }, 1000);
  response.headers.set("Refresh", "1;url=/"); // Delay for 1 second, then redirect to `/`

  return response;
}
