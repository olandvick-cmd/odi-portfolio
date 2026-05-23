import { supabase } from "@/lib/supabase";
import MessagesList from "@/components/admin/MessagesList";

// 🔄 Force Next.js to always fetch real-time data instead of loading a static cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminMessagesPage() {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl">
        Failed to load client inbox messages: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Client Inbox</h1>
        <p className="text-gray-400 text-sm mt-1">
          Review project opportunities, messages, and incoming business leads.
        </p>
      </div>

      <MessagesList initialMessages={messages || []} />
    </div>
  );
}