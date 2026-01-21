// app/auth/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_ID = "admin";
const ADMIN_PASS = "raj123";

export default function AuthPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (id === ADMIN_ID && password === ADMIN_PASS) {
      // store auth (temporary, simple)
      localStorage.setItem("auth", "true");

      router.replace("/orders");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f6f3]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl p-8"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Raj Watches Admin
        </h1>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <input
          placeholder="Admin ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
