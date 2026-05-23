"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa6";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
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
      toast.error("Failed to send message");
      return;
    }

    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section id="contact" className="py-32 scroll-mt-24">
      
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
          Contact
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
          Let’s build<br />something great.
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Have a project, collaboration, or opportunity? Let’s discuss it.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* LEFT: Contact Cards */}
        <GlassCard className="p-8 md:p-10 flex flex-col justify-center">
          <div className="space-y-8">
            
            {/* Email card */}
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300 shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                  Email
                </p>
                <a 
                  href="mailto:contact@kellygraphy.com" 
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200 break-all"
                >
                  vetexgraphics@gmail.com
                </a>
              </div>
            </div>

            {/* Phone card */}
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300 shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                  Phone
                </p>
                <a 
                  href="tel:+2348000000000" 
                  className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200"
                >
                  +234 (0) 90 4500 3152
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300 shrink-0">
                <FaWhatsapp size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">
                  Whatsapp
                </p>
                <h3 className="text-xl font-semibold text-white">
                  +234 90 4500 3152
                </h3>
              </div>
            </div>

          </div>
        </GlassCard>

        {/* RIGHT: Input Form */}
        <GlassCard className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name input */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white/[0.02] focus:bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500/40 text-white placeholder-gray-600 transition-all duration-200"
              />
            </div>

            {/* Email input */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-white/[0.02] focus:bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-500/40 text-white placeholder-gray-600 transition-all duration-200"
              />
            </div>

            {/* Message input */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 font-medium">
                Message
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project concept..."
                className="w-full bg-white/[0.02] focus:bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none focus:border-purple-500/40 text-white placeholder-gray-600 transition-all duration-200"
              />
            </div>

            {/* Form Submit button trigger */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-colors py-4 rounded-2xl font-semibold text-white shadow-lg shadow-purple-600/10"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </Button>
            </div>

          </form>
        </GlassCard>

      </div>

    </section>
  );
}