"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, 
  Eye, 
  MousePointerClick, 
  Users, 
  Clock, 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Laptop 
} from "lucide-react";
import Link from "next/link";

// High-fidelity structural records for initial page visualization
const trafficMetrics = [
  { name: "Total Page Views", value: "14,820", raw: 14820, change: "+18.4%", icon: Eye, tint: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { name: "Unique Visitors", value: "3,110", raw: 3110, change: "+12.1%", icon: Users, tint: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { name: "Interaction Clicks", value: "1,245", raw: 1245, change: "+6.8%", icon: MousePointerClick, tint: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Avg Engagement", value: "2m 45s", raw: 165, change: "Stable", icon: Clock, tint: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
];

const topRoutes = [
  { path: "/", views: "8,450", rate: "57%" },
  { path: "/projects/homely", views: "3,120", rate: "21%" },
  { path: "/projects/nexus-v2", views: "1,940", rate: "13%" },
  { path: "/blog/minimalist-shaders", views: "1,310", rate: "9%" },
];

const customEvents = [
  { action: "Viewed Project Case Study", category: "Homely Platform", triggers: "842 clicks" },
  { action: "Initiated Contact Form", category: "Handshake Portal", triggers: "194 clicks" },
  { action: "Downloaded Resume PDF", category: "Identity Asset", triggers: "88 clicks" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8 select-none relative animate-fade-in text-white max-w-6xl mx-auto p-4 md:p-8">
      
      {/* HEADER CONTROLS NAVIGATION BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.05]">
        <div>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-purple-400 transition mb-2"
          >
            <ArrowLeft size={12} /> Return to workstation control
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Traffic Analytics // <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 via-white to-purple-400">Stream Overview</span>
          </h1>
        </div>

        {/* Action button to open full native Umami telemetry console */}
        <a
          href="https://cloud.umami.is"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 px-4 py-2.5 rounded-xl transition duration-200 self-start sm:self-auto group"
        >
          Launch Umami Console
          <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* METRIC INDEX COUNTERS PANEL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trafficMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div 
              key={metric.name}
              className="relative group bg-zinc-950/40 border border-white/[0.04] rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20 hover:bg-zinc-950/80"
            >
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-purple-500/40 rounded-tr-xl transition-all duration-300" />
              
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 tracking-wide uppercase">{metric.name}</span>
                <div className={`p-2 rounded-xl border ${metric.tint}`}>
                  <Icon size={18} />
                </div>
              </div>
              
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white tracking-tight">{metric.value}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                  metric.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DATA ANALYSIS ROW ENVIRONMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TOP INTERACTIVE PATHWAYS LOG LIST */}
        <div className="lg:col-span-2 bg-zinc-950/20 border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <TrendingUp size={14} className="text-purple-400" />
                Top Performing Routes
              </h3>
              <span className="text-[10px] font-mono text-zinc-600">Distribution Index</span>
            </div>

            <div className="space-y-2">
              {topRoutes.map((route, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-zinc-950/40 border border-white/[0.02] rounded-xl hover:border-white/[0.06] transition duration-150"
                >
                  <span className="text-xs font-mono text-zinc-300">{route.path}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-white">{route.views} <span className="text-[10px] font-mono text-zinc-600 font-normal">views</span></span>
                    <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md w-12 text-center">{route.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOM INTERACTION EVENTS LOGS */}
        <div className="bg-zinc-950/20 border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-6">
              Custom Click Events
            </h3>
            
            <div className="space-y-4">
              {customEvents.map((ev, idx) => (
                <div key={idx} className="space-y-1 p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-300">{ev.action}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{ev.triggers}</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">{ev.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC TELEMETRY FOOTNOTE SUMMARY */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500 flex items-center justify-between">
            <span>Tracking engine version</span>
            <span className="text-zinc-400">Umami JS Tracker v2.0</span>
          </div>
        </div>

      </div>

    </div>
  );
}