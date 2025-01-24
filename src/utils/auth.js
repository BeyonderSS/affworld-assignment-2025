import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET;

export async function auth(req) {
  await dbConnect();

  // Get the token from the cookies or headers
  const token = req.cookies.get("authToken")?.value || req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch the user from the database using the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) return null;

    return { userId: user._id, email: user.email };
  } catch (err) {
    console.error("Auth Error:", err);
    return null;
  }
}
