"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegisterResponse {
  message?: string;
  error?: string;
  success?: boolean;
}

export default function RegisterPage() {
  const router = useRouter();

  // ✅ State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous states
    setError(null);
    setSuccess(null);

    // Prevent duplicate request
    if (loading) return;

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: RegisterResponse = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess(data.message || "Registration successful!");
        // Optionally redirect to login after success
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null); // clear error on input
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null); // clear error on input
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            ) : null}
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
