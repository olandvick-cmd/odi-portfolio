import { supabase } from "@/lib/supabase";
import AddProjectForm from "@/components/admin/AddProjectForm";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import Image from "next/image";
import Link from "next/link";
import { Code2, Paintbrush } from "lucide-react";

export default async function AdminProjectsPage() {

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-3">
          Projects
        </h1>

        <p className="text-gray-400">
          Manage your portfolio projects and customize adaptive case studies.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <AddProjectForm />
      </div>

      {/* Projects List */}
      <div className="space-y-5">

        {projects?.map((project) => {
          const isDesign = project.project_type === "design";
          
          return (
            <div
              key={project.id}
              className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition hover:border-white/20"
            >

              {/* Left Side Content */}
              <div className="flex items-center gap-5">

                {/* Primary Preview Thumbnail */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex-shrink-0">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Structured Copy Area */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl font-semibold">
                      {project.title}
                    </h3>
                    
                    {/* Visual Project Type Badge Indicator */}
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                      isDesign 
                        ? "bg-pink-500/10 border-pink-500/20 text-pink-400" 
                        : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                    }`}>
                      {isDesign ? (
                        <>
                          <Paintbrush size={10} /> Design & Branding
                        </>
                      ) : (
                        <>
                          <Code2 size={10} /> Web Development
                        </>
                      )}
                    </span>
                  </div>

                  {project.subtitle && (
                    <p className="text-xs text-purple-300/70 font-medium line-clamp-1">
                      {project.subtitle}
                    </p>
                  )}

                  <p className="text-gray-400 text-sm max-w-md line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

              </div>

              {/* Action Modifiers Block */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <Link
                  href={`/admin/projects/edit/${project.id}`}
                  className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/[0.04] hover:border-purple-500/40 transition text-sm font-medium"
                >
                  Edit
                </Link>

                <DeleteProjectButton
                  id={project.id}
                  image={project.image}
                />
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}