"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Paintbrush, LayoutGrid, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  project_type: "development" | "design";
  tags?: string[];
}

interface PortfolioGridProps {
  initialProjects: Project[];
}

export default function PortfolioGrid({ initialProjects }: PortfolioGridProps) {
  // Filter types: 'all', 'development', or 'design'
  const [activeFilter, setActiveFilter] = useState<"all" | "development" | "design">("all");

  // Filter the projects dynamically based on choice
  const filteredProjects = initialProjects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.project_type === activeFilter;
  });

  return (
    <div className="space-y-12 w-full">
      
      {/* FILTER CONTROL BAR */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
          
          {/* Filter: All */}
          <button
            onClick={() => setActiveFilter("all")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "all"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={14} />
            All Works
          </button>

          {/* Filter: Dev */}
          <button
            onClick={() => setActiveFilter("development")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "development"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Code2 size={14} />
            Web Apps
          </button>

          {/* Filter: Branding/Design */}
          <button
            onClick={() => setActiveFilter("design")}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
              activeFilter === "design"
                ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Paintbrush size={14} />
            Branding & Design
          </button>

        </div>
      </div>

      {/* DYNAMIC CASE STUDY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500">
        {filteredProjects.map((project) => {
          const isDesign = project.project_type === "design";

          return (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="group relative block bg-white/[0.01] border border-white/5 rounded-[32px] overflow-hidden p-4 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.02] hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 w-full rounded-[24px] overflow-hidden bg-black/40 border border-white/5">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                
                {/* Floating Meta Tag */}
                <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${
                  isDesign
                    ? "bg-pink-950/60 border-pink-500/30 text-pink-300"
                    : "bg-purple-950/60 border-purple-500/30 text-purple-300"
                }`}>
                  {isDesign ? "Branding" : "Dev Build"}
                </span>
              </div>

              {/* Text Meta Content Area */}
              <div className="pt-5 px-2 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-xs font-medium text-gray-400 mt-0.5">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Subtle Link Indicator Arrow */}
                  <div className="p-2 rounded-full border border-white/5 bg-white/[0.02] text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tags Tray */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] text-gray-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-gray-500 self-center font-medium">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Zero State Fallback */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
          <p className="text-gray-400 text-sm italic">
            No projects published in this track yet. Check back soon!
          </p>
        </div>
      )}

    </div>
  );
}