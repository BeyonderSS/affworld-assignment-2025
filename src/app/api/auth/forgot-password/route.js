import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Email not found." }), { status: 404 });
  }

  // Generate a secure token
  const token = crypto.randomBytes(20).toString("hex");

  // Save token and expiration to user
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email provider
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  // Email details
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset Request",
    text: `You are receiving this because you (or someone else) have requested to reset the password for your account.
Please click the following link, or paste it into your browser to complete the process:
${resetUrl}
If you did not request this, please ignore this email.`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true, message: "Password reset email sent." }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, message: "Error sending email." }), { status: 500 });
  }
}
