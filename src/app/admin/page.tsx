"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this matches your Supabase client initialization path
import { 
  FolderKanban, 
  MessageSquare, 
  Newspaper, 
  Eye, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles,
  Loader2
} from "lucide-react";
import Link from "next/link";

interface ActivityItem {
  id: string | number;
  title: string;
  time: string;
  desc: string;
}

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [loading, setLoading] = useState(true);
  
  // Real database numeric metrics
  const [projectsCount, setProjectsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  
  // Compiled dynamic logs feed state
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // 1. Calculate Greeting Time Window
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Good morning");
    else if (hr < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // 2. Fetch Aggregated Production Values 
    async function streamDashboardMetrics() {
      try {
        const [projectsRes, messagesRes, postsRes, recentMsgsRes, recentPostsRes] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("messages").select("id", { count: "exact", head: true }),
          supabase.from("posts").select("id", { count: "exact", head: true }),
          supabase.from("messages").select("name, created_at, message").order("created_at", { ascending: false }).limit(2),
          supabase.from("posts").select("title, created_at").order("created_at", { ascending: false }).limit(1)
        ]);

        // Establish layout values with fallbacks
        const pCount = projectsRes.count || 0;
        const mCount = messagesRes.count || 0;
        const bCount = postsRes.count || 0;

        setProjectsCount(pCount);
        setMessagesCount(mCount);
        setPostsCount(bCount);

        // 3. Compile Real Database Elements into Live Feed Handshake Log
        const compiledActivities: ActivityItem[] = [];

        if (recentMsgsRes.data && recentMsgsRes.data.length > 0) {
          recentMsgsRes.data.forEach((msg, idx) => {
            compiledActivities.push({
              id: `msg-${idx}`,
              title: `Inquiry from ${msg.name}`,
              time: new Date(msg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              desc: msg.message || "No preview message available."
            });
          });
        }

        if (recentPostsRes.data && recentPostsRes.data.length > 0) {
          const post = recentPostsRes.data[0];
          compiledActivities.push({
            id: "blog-1",
            title: `Article Node Published`,
            time: new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            desc: `"${post.title}" is successfully deployed live.`
          });
        }

        // Fallback placeholder if tables are fully clear
        if (compiledActivities.length === 0) {
          compiledActivities.push({
            id: "fallback",
            title: "Database Index Synchronized",
            time: "Now",
            desc: "All content queues are currently processed and idling optimally."
          });
        }

        setActivities(compiledActivities);
      } catch (error) {
        console.error("Failed to parse core dashboard infrastructure metrics:", error);
      } finally {
        setLoading(false);
      }
    }

    streamDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none relative animate-fade-in">
      
      {/* 1. TOP HEADER BRAND HERO */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
            <Sparkles size={12} className="animate-pulse" />
            Core Analytics Control Node
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-purple-400">Odi</span>
          </h1>
        </div>
        
        {/* Quick Tech Status Tag */}
        <div className="flex items-center gap-3 bg-zinc-900/60 border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-400 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          System Active // production_v1.2
        </div>
      </div>

      {/* 2. SYSTEM STATS GRID OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TOTAL VIEWS CARD -> CLICKABLE ANCHOR LINK */}
        <Link 
          href="/admin/analytics"
          className="relative group bg-zinc-950/40 border border-white/[0.04] rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20 hover:bg-zinc-950/80 block cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-purple-500/40 rounded-tr-xl transition-all duration-300" />
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-mono text-zinc-500 tracking-wide uppercase">Total Views</span>
            <div className="p-2 rounded-xl border text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20 transition duration-200">
              <Eye size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white tracking-tight">Track</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-400 flex items-center gap-0.5">
              Open Board <ArrowUpRight size={10} />
            </span>
          </div>
        </Link>

        {/* INQUIRIES CARD */}
        <div className="relative group bg-zinc-950/40 border border-white/[0.04] rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20 hover:bg-zinc-950/80">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-mono text-zinc-500 tracking-wide uppercase">Inquiries</span>
            <div className="p-2 rounded-xl border text-purple-400 bg-purple-500/10 border-purple-500/20">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white tracking-tight">{messagesCount}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
              Live Queue
            </span>
          </div>
        </div>

        {/* LIVE PROJECTS CARD */}
        <div className="relative group bg-zinc-950/40 border border-white/[0.04] rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20 hover:bg-zinc-950/80">
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-purple-500/40 rounded-tr-xl transition-all duration-300" />
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-mono text-zinc-500 tracking-wide uppercase">Live Projects</span>
            <div className="p-2 rounded-xl border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
              <FolderKanban size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white tracking-tight">{projectsCount}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400">
              Inventory
            </span>
          </div>
        </div>

        {/* BLOG POSTS CARD */}
        <div className="relative group bg-zinc-950/40 border border-white/[0.04] rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20 hover:bg-zinc-950/80">
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-mono text-zinc-500 tracking-wide uppercase">Blog Posts</span>
            <div className="p-2 rounded-xl border text-amber-400 bg-amber-500/10 border-amber-500/20">
              <Newspaper size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-white tracking-tight">{postsCount}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400">
              Articles
            </span>
          </div>
        </div>

      </div>

      {/* 3. TWIN CONTENT ROW LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity Log Console (Takes up 2/3 of grid space) */}
        <div className="lg:col-span-2 bg-zinc-950/20 border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <TrendingUp size={14} className="text-purple-400" />
                Live Feed Handshake Log
              </h3>
              <span className="text-[10px] font-mono text-zinc-600">Updated Realtime</span>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="group relative flex flex-col gap-1 p-4 bg-zinc-950/50 rounded-xl border border-white/[0.02] hover:border-white/[0.06] transition duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition duration-150">
                      {activity.title}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500">{activity.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 max-w-xl font-sans leading-relaxed break-words">{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/[0.04] text-center lg:text-left">
            <Link 
              href="/admin/messages" 
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition duration-200"
            >
              Access communications matrix <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Action Center Terminal Node (Takes up 1/3 of grid space) */}
        <div className="bg-zinc-950/20 border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-6">
              Fast-Access Pipelines
            </h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              <Link 
                href="/admin/projects" 
                className="flex items-center justify-between p-4 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 text-purple-300 rounded-xl transition font-mono text-xs font-bold tracking-wider uppercase group"
              >
                Deploy Project Assets
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link 
                href="/admin/blog" 
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-zinc-300 rounded-xl transition font-mono text-xs tracking-wider uppercase group"
              >
                Compose Editorial Node
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link 
                href="/admin/profile" 
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-zinc-300 rounded-xl transition font-mono text-xs tracking-wider uppercase group"
              >
                Modify Identity Parameters
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Technical Architecture Readout */}
          <div className="mt-6 pt-6 border-t border-white/[0.04] bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl p-4 border border-white/[0.02]">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Database Cloud Health</div>
            <div className="text-xs text-zinc-300 font-mono font-bold flex items-center justify-between">
              <span>Supabase Cluster Connection</span>
              <span className="text-emerald-400 font-normal">Optimal</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}