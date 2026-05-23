"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Calendar, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Props {
  initialMessages: Message[];
}

export default function MessagesList({ initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    
    setDeletingId(id);
    const { error } = await supabase.from("messages").delete().eq("id", id);
    setDeletingId(null);

    if (error) {
      toast.error("Failed to delete record: " + error.message);
      return;
    }

    toast.success("Message deleted cleanly!");
    setMessages(messages.filter((msg) => msg.id !== id));
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-[32px]">
        <p className="text-gray-500 text-lg font-medium">Your inbox is completely clear.</p>
        <p className="text-gray-600 text-sm mt-1">New client requests will populate automatically right here!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {messages.map((msg) => {
        const messageDate = new Date(msg.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={msg.id}
            className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-2xl p-6 transition-all duration-200"
          >
            {/* Header Layout Info */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-semibold text-lg">
                  <User size={16} className="text-purple-400" />
                  {msg.name}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-300 transition-colors">
                  <Mail size={14} />
                  <a href={`mailto:${msg.email}`}>{msg.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
                  <Calendar size={12} />
                  {messageDate}
                </span>

                {/* Delete button action */}
                <button
                  disabled={deletingId === msg.id}
                  onClick={() => handleDelete(msg.id)}
                  className="text-gray-500 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 disabled:opacity-40"
                  title="Delete message"
                >
                  <Trash2 size={16} className={deletingId === msg.id ? "animate-pulse" : ""} />
                </button>
              </div>
            </div>

            {/* Message Body Block */}
            <div className="bg-black/20 border border-white/5 rounded-xl p-4 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}