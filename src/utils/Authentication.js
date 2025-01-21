"use server"

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function registerUser(name, email, passwordHash) {
    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "Email is already registered." };
        }

        const newUser = new User({
            name,
            email,
            passwordHash,
        });

        await newUser.save();

        return { success: true, data: newUser, message: "User registered successfully." };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, error: error.message };
    }
}

export async function loginUser(email, passwordHash) {
    try {
        await dbConnect();

        const user = await User.findOne({ email });
        if (!user || user.passwordHash !== passwordHash) {
            return { success: false, error: "Invalid email or password." };
        }

        return { success: true, data: user, message: "Login successful." };
    } catch (error) {
        console.error("Error logging in user:", error);
        return { success: false, error: error.message };
    }
}
