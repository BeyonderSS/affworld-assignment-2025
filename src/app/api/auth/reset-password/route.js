import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { token, newPassword } = await req.json();

  // Find the user by reset token and ensure the token is not expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid or expired token." }), { status: 400 });
  }

  // Hash the new password and update the user's record
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.passwordHash = hashedPassword;
  user.resetPasswordToken = null; // Clear the reset token
  user.resetPasswordExpires = null; // Clear the token expiration
  await user.save();

  return new Response(JSON.stringify({ success: true, message: "Password has been reset successfully." }), { status: 200 });
}
