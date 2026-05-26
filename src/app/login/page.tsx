"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Mouse glow effect
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const loginToast = toast.loading(
      "Verifying identity coordinates..."
    );

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        toast.error(error.message, {
          id: loginToast,
        });

        setLoading(false);
        return;
      }

      if (!data?.user) {
        toast.error(
          "Authentication failed.",
          {
            id: loginToast,
          }
        );

        setLoading(false);
        return;
      }

      toast.success(
        "Access Granted. Welcome back, Admin.",
        {
          id: loginToast,
        }
      );

      // Important for production auth sync
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      router.replace("/admin");
      router.refresh();

    } catch (error) {
      console.error(error);

      toast.error(
        "Security handshake failed.",
        {
          id: loginToast,
        }
      );

      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030303] flex items-center justify-center px-6 overflow-hidden select-none font-sans">
      <Toaster position="top-right" />

      {/* Dynamic Pointer Glow */}
      <div
        className="absolute w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out hidden md:block"
        style={{
          transform: `translate(${mousePos.x - 225}px, ${
            mousePos.y - 225
          }px)`,
          position: "fixed",
          left: 0,
          top: 0,
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">

        {/* Corner Borders */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-purple-500/40 rounded-tl-md pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-purple-500/40 rounded-tr-md pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-purple-500/40 rounded-bl-md pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-purple-500/40 rounded-br-md pointer-events-none" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 bg-black/40 border border-white/[0.06] backdrop-blur-2xl rounded-3xl p-8 space-y-6 shadow-3xl shadow-black/90"
        >
          {/* Top Indicators */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
              Security Node // 01
            </span>

            <div className="flex space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  loading
                    ? "bg-purple-500 animate-pulse"
                    : "bg-emerald-500"
                }`}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Initialize Portal
            </h1>

            <p className="text-xs text-zinc-400 font-mono">
              Provide identity tokens to decrypt
              space resources.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Identity User
              </label>
            </div>

            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-zinc-950/60 border border-white/[0.05] rounded-xl px-4 py-3.5 outline-none text-white focus:border-purple-500/40 focus:bg-zinc-950 transition duration-300 text-sm font-mono tracking-wide placeholder:text-zinc-700 disabled:opacity-40"
              placeholder="root@odiportfolio.app"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Security Token
              </label>
            </div>

            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-zinc-950/60 border border-white/[0.05] rounded-xl px-4 py-3.5 outline-none text-white focus:border-purple-500/40 focus:bg-zinc-950 transition duration-300 text-sm font-mono tracking-wide placeholder:text-zinc-700 disabled:opacity-40"
              placeholder="••••••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-300 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest active:scale-[0.985]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 014 12H0c0 
                    3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>

                Decrypting...
              </span>
            ) : (
              "Execute Authentication"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[10px] text-zinc-600 font-mono mt-6 tracking-wide">
          System: Core.Vercel_Edge // Location:
          /admin
        </p>
      </div>
    </main>
  );
}