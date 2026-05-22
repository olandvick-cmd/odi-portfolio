"use client";

import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function Contact() {

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase
        .from("messages")
        .insert([
          {
            name,
            email,
            message,
          },
        ]);

    setLoading(false);

    if (error) {
      toast.error(
        "Failed to send message"
      );

      return;
    }

    toast.success(
      "Message sent successfully"
    );

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section
      id="contact"
      className="py-32"
    >

      {/* Header */}
      <div className="mb-16 max-w-2xl">

        <span className="text-sm uppercase tracking-[0.3em] text-purple-400">
          Contact
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          Let’s build
          something great.
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          Have a project, collaboration or opportunity?
          Let’s discuss it.
        </p>

      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <GlassCard className="p-8 md:p-10">

          <div className="space-y-8">

            <div className="flex items-start gap-5">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Mail />
              </div>

              <div>

                <p className="text-gray-500 mb-2">
                  Email
                </p>

                <h3 className="text-xl font-semibold">
                  odi@example.com
                </h3>

              </div>

            </div>

            <div className="flex items-start gap-5">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Phone />
              </div>

              <div>

                <p className="text-gray-500 mb-2">
                  Phone
                </p>

                <h3 className="text-xl font-semibold">
                  +234 000 000 0000
                </h3>

              </div>

            </div>

            <div className="flex items-start gap-5">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MapPin />
              </div>

              <div>

                <p className="text-gray-500 mb-2">
                  Location
                </p>

                <h3 className="text-xl font-semibold">
                  Nigeria
                </h3>

              </div>

            </div>

          </div>

        </GlassCard>

        {/* RIGHT */}
        <GlassCard className="p-8 md:p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>

              <label className="block text-sm text-gray-400 mb-3">
                Full Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500/30 transition"
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm text-gray-400 mb-3">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500/30 transition"
              />

            </div>

            {/* Message */}
            <div>

              <label className="block text-sm text-gray-400 mb-3">
                Message
              </label>

              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none focus:border-purple-500/30 transition"
              />

            </div>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Message"}
            </Button>

          </form>

        </GlassCard>

      </div>

    </section>
  );
}