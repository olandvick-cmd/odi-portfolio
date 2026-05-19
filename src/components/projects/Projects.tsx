import { supabase } from "@/lib/supabase";

export default async function Projects() {

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      
      <div className="mb-14">
        <p className="text-purple-400 mb-3">
          Featured Work
        </p>

        <h2 className="text-4xl font-bold">
          Selected Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {projects?.map((project) => (
          <div
            key={project.id}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition"
          >
            
            <div className="h-52 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mb-6"></div>

            <h3 className="text-2xl font-semibold mb-4">
              {project.title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}