import { supabase } from "@/lib/supabase";
import AddProjectForm from "@/components/admin/AddProjectForm";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import Image from "next/image";
import Link from "next/link";

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
          Manage your portfolio projects.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <AddProjectForm />
      </div>

      {/* Projects List */}
      <div className="space-y-5">

        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 flex items-center justify-between gap-5"
          >

            {/* Left */}
            <div className="flex items-center gap-5">

              {/* Image */}
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10">

                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}

              </div>

              {/* Info */}
              <div>

                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm max-w-md line-clamp-2">
                  {project.description}
                </p>

              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

             <Link
              href={`/admin/projects/edit/${project.id}`}
              className="px-5 py-3 rounded-2xl border border-white/10 hover:border-purple-500/30 transition"
               >
                 Edit
               </Link>

              <DeleteProjectButton
              id={project.id}
              image={project.image}
              
              />
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}