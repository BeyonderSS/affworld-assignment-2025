"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success) {
      window.location.href = "/"; // Redirect to dashboard
    } else {
      setErrorMessage(result.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"; // Google OAuth route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Login</h2>

        {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              className={`w-full px-4 py-2 mt-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 mt-4 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        >
          Login with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline dark:text-blue-400">
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
}
