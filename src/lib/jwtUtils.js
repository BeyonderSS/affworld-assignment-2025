import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;


export async function encodeToken(payload) {
  try {
    // Encode the payload into a JWT token with proper header and signing
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })  // Set the algorithm used for signing (HS256)
      .setIssuedAt() // Set the issued at timestamp
      .setExpirationTime('1d') // Set expiration time (1 day in this case)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET)); // Sign with the secret

    return jwt;
  } catch (error) {
    console.error("Error encoding token:", error);
    throw new Error("Token encoding failed.");
  }
}


// Utility function to decode and verify a JWT token
export async function decodeToken(token) {
  try {
    // Verify and decode the JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload; // Return the decoded payload (user information, etc.)
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid or expired token.");
  }
}
