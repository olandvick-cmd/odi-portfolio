import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, FolderGit2 } from "lucide-react";


export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch single project details matching the route parameter token ID
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition">
          <ArrowLeft size={18} />
          Back to home
        </Link>

        {/* Image Showcase */}
        <div className="relative h-[450px] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl mb-12 bg-black/40">
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

        {/* Description Header layout info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          
          <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
            {project.description}
          </p>

          {/* Links for External deployment metrics if added in schema later */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer" className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                <Globe size={18} /> Live Site
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" className="border border-white/10 hover:bg-white/5 transition px-6 py-3 rounded-xl font-medium flex items-center gap-2">
                <FolderGit2 size={18} /> Source Code
              </a>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}