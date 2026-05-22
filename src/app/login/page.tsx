"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter(); // 2. Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    // 3. Refresh server data to pick up the new session cookie, then transition smoothly
    router.refresh();
    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full"></div>

      {/* Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[32px] p-8 space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-gray-400">Login to your admin dashboard.</p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition px-6 py-4 rounded-2xl font-medium text-white"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}