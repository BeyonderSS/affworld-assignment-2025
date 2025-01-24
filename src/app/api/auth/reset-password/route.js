import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { encodeToken } from "@/lib/jwtUtils";

export async function POST(req) {
  try {
    // Connect to the database
    console.log("Connecting to the database...");
    await dbConnect();
    console.log("Database connection established.");

    // Parse request body
    const { token, newPassword } = await req.json();
    console.log("Received request to reset password with token:", token);

    // Find the user by reset token and ensure the token is not expired
    console.log("Searching for user with reset token...");
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("No user found or token has expired.");
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or expired token." }),
        { status: 400 }
      );
    }

    console.log("User found. Proceeding to update password.");

    // Hash the new password and update the user's record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("New password hashed successfully.");

    user.passwordHash = hashedPassword;
    user.resetPasswordToken = null; // Clear the reset token
    user.resetPasswordExpires = null; // Clear the token expiration
    await user.save();

    console.log("User password updated successfully.");

    // Create a session token
    console.log("Generating session token for user.");
    const sessionToken = await encodeToken({ userId: user._id, email: user.email });
    console.log("Session token generated:", sessionToken);

    // Set the session token in an HTTP-only cookie
    const response = new Response(
      JSON.stringify({ success: true, message: "Password has been reset successfully." }),
      { status: 200 }
    );
    response.headers.append(
      "Set-Cookie",
      `authToken=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 24}; Path=/`
    );

    console.log("Session token set in the cookie.");
    return response;
  } catch (error) {
    console.error("Error during password reset process:", error.message);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error." }),
      { status: 500 }
    );
  }
}
