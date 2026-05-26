"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Paintbrush, LayoutGrid } from "lucide-react";

interface Props {
  projects: any[];
}

export default function Projects({ projects }: Props) {
  // Filter types: 'all', 'development', or 'design'
  const [activeFilter, setActiveFilter] = useState<"all" | "development" | "design">("all");

  // Filter projects array based on client choice
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.project_type === activeFilter;
  });

  return (
    <section className="py-32">
      
      {/* Header & Filter Controls Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div>
          <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Selected work &<br />
            creative projects.
          </h2>
        </div>

        {/* CONTROLS: Interactive Segmented Pill */}
        <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md self-start lg:self-auto shadow-xl">
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={13} />
            All
          </button>

          <button
            onClick={() => setActiveFilter("development")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "development"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Code2 size={13} />
            Dev Builds
          </button>

          <button
            onClick={() => setActiveFilter("design")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "design"
                ? "bg-pink-600 text-white shadow-md shadow-pink-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Paintbrush size={13} />
            Design
          </button>
        </div>
      </div>

      {/* Empty State Fallback */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-[32px]">
          <p className="text-gray-500 italic">No projects found in this collection track yet.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-300">
        {filteredProjects.map((project) => {
          const isDesign = project.project_type === "design";

          return (
            <div
              key={project.id}
              className={`group bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isDesign 
                  ? "hover:border-pink-500/30 hover:bg-pink-950/[0.03]" 
                  : "hover:border-purple-500/30 hover:bg-purple-950/[0.03]"
              }`}
            >
              <div>
                {/* Image Container linking to dynamic project detail route */}
                <Link href={`/projects/${project.id}`} className="block relative h-[260px] overflow-hidden bg-black/20">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition duration-500"
                      sizes="(max-w-7xl) 33vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/[0.02]">
                      No Image Available
                    </div>
                  )}

                  {/* Adaptive Floating Type Badge Overlay */}
                  <span className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${
                    isDesign
                      ? "bg-pink-950/60 border-pink-500/30 text-pink-300"
                      : "bg-purple-950/60 border-purple-500/30 text-purple-300"
                  }`}>
                    {isDesign ? "Branding" : "Dev Build"}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-7 space-y-3">
                  <div>
                    <h3 className={`text-2xl font-semibold tracking-tight transition-colors duration-200 ${
                      isDesign ? "group-hover:text-pink-400" : "group-hover:text-purple-400"
                    }`}>
                      {project.title}
                    </h3>
                    
                    {/* Pre-populated structural subtitle */}
                    {project.subtitle && (
                      <p className="text-xs font-medium text-gray-400 mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Built-in Tags Tray Layout */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] text-gray-500 self-center font-medium pl-0.5">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* View Project Action Trigger */}
              <div className="px-7 pb-7 pt-0">
                <Link 
                  href={`/projects/${project.id}`} 
                  className={`inline-flex items-center gap-1.5 font-medium text-sm group/btn transition-colors ${
                    isDesign ? "text-pink-400 hover:text-pink-300" : "text-purple-400 hover:text-purple-300"
                  }`}
                >
                  View Case Study 
                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}