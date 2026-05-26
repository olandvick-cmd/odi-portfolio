import { supabase } from "@/lib/supabase";
import { Mail, Clock, Trash2, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

// FORCE NEXT.JS TO PULL FRESH STORAGE DATA ON EVERY PAGE VIEW (NO CACHING)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  // Pull incoming messages ordered strictly by freshest arrival time first
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase cluster fetch error:", error);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 md:p-12 space-y-8">
      
      {/* HEADER NAVIGATION BLOCK */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-400 transition mb-2">
            <ArrowLeft size={14} /> Back to projects dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2.5">
            <MessageSquare className="text-purple-400" size={28} />
            Inbound Inquiries
          </h1>
          <p className="text-gray-400 text-sm font-light mt-1">
            Review incoming project proposals and client correspondence data.
          </p>
        </div>
        
        {/* COUNTER BADGE */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl px-4 py-2 self-start md:self-auto text-xs font-mono text-gray-400">
          Total Logs: <span className="text-purple-400 font-bold">{messages?.length || 0}</span>
        </div>
      </div>

      {/* MESSAGES CORE RUNTIME CONTAINER */}
      <div className="max-w-5xl mx-auto space-y-4">
        
        {messages && messages.length > 0 ? (
          messages.map((msg) => {
            // Safe inline parse fallback for timestamps
            const receivedDate = msg.created_at 
              ? new Date(msg.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Date unknown";

            return (
              <div 
                key={msg.id} 
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.03] hover:border-white/20 transition duration-200 flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                {/* Meta details & Message Body text allocation */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      {msg.name}
                    </h3>
                    <a 
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition font-medium"
                    >
                      <Mail size={12} />
                      {msg.email}
                    </a>
                  </div>

                  <p className="text-sm text-gray-300 font-light leading-relaxed whitespace-pre-wrap bg-black/20 border border-white/5 rounded-xl p-4">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    <Clock size={12} />
                    Received: {receivedDate}
                  </div>
                </div>

                {/* Optional actions pane (e.g. Server action deletion anchors can attach here) */}
                <div className="shrink-0 flex md:flex-col items-center justify-end">
                  <button 
                    title="Archive log record"
                    className="p-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/30 text-red-400/80 hover:text-red-400 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          /* EMPTY FALLBACK CONTAINER BUILD */
          <div className="text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[32px]">
            <p className="text-gray-500 text-sm italic">
              No inbound logs discovered inside database cache. Try submitting a form on the homepage!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}