import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, FolderGit2, Calendar, ShieldCheck, Palette, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch all existing and upcoming fields from your Supabase projects table
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  // Determine page mode based on project type
  const isDesign = project.project_type === "design";

  return (
    <main className="min-h-screen bg-[#050816] text-white py-16 md:py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Navigation Action Header */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 mb-8 md:mb-12 transition group text-sm font-medium"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        {/* Hero Header Block */}
        <div className="space-y-4 mb-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-800/30 px-3 py-1 rounded-full">
            {isDesign ? "Branding & Identity" : "Web Development"}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xl text-gray-400 font-medium">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Hero Media Showcase */}
        <div className="relative h-[300px] md:h-[550px] w-full rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-2xl mb-12 md:mb-16 bg-black/40">
          {project.image && (
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Dynamic Two-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Sticky Context and Metadata Panel */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 space-y-8 backdrop-blur-md">
            
            {/* Context/Role Row */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                <Layers size={14} className="text-purple-400" /> Role / Scope
              </h3>
              <p className="text-gray-200 text-base font-medium">
                {project.role || (isDesign ? "Lead Identity Designer" : "Full Stack Developer")}
              </p>
            </div>

            {/* Dynamic Tags Block (Tech Stack vs Design Deliverables) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-purple-400" /> 
                {isDesign ? "Tools & Deliverables" : "Stack & Technologies"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic">Not structured yet</span>
                )}
              </div>
            </div>

            {/* DESIGN SPECIALTY: Colors Palette Block */}
            {isDesign && project.colors && project.colors.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Palette size={14} className="text-purple-400" /> Brand Palette
                </h3>
                <div className="flex items-center gap-3">
                  {project.colors.map((color: string, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-10 h-10 rounded-full border border-white/20 shadow-md transition-transform hover:scale-110" 
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <span className="text-[10px] font-mono text-gray-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Deployment Links */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              {project.live_url && (
                <a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] transition px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-600/20"
                >
                  <Globe size={16} /> {isDesign ? "View Case Study" : "Live Deployment"}
                </a>
              )}
              {!isDesign && project.github_url && (
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-white/[0.03] border border-white/10 hover:bg-white/10 active:scale-[0.98] transition px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  <FolderGit2 size={16} /> Source Repository
                </a>
              )}
            </div>
          </aside>

          {/* RIGHT COLUMN: Core Narrative & Supplementary Galleries */}
          <section className="lg:col-span-8 space-y-12">
            
            {/* Primary Case Study Content */}
            <article className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold tracking-tight mb-4 border-b border-white/5 pb-2 text-purple-400">
                The Story & Process
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line font-light">
                {project.description || "No description provided yet."}
              </p>
            </article>

            {/* Asset Gallery Showcase Grid (Crucial for Design/Mockups) */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <div className="space-y-6 pt-6">
                <h2 className="text-2xl font-bold tracking-tight border-b border-white/5 pb-2 text-purple-400">
                  {isDesign ? "Visual Assets & Production Mockups" : "Interface & Architecture Breakdowns"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery_images.map((imgUrl: string, idx: number) => (
                    <div 
                      key={idx} 
                      className={`relative h-[250px] rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-xl group transition-all duration-300 ${
                        idx === 0 && project.gallery_images.length % 2 !== 0 ? "md:col-span-2 h-[380px]" : ""
                      }`}
                    >
                      <Image 
                        src={imgUrl} 
                        alt={`Showcase breakdown aspect ${idx + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}