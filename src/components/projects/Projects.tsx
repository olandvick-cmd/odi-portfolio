import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  projects: any[];
}

export default function Projects({ projects }: Props) {
  return (
    <section className="py-32">
      
      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
            Featured Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Selected work &<br />
            creative projects.
          </h2>
        </div>
      </div>

      {/* Empty State Fallback */}
      {projects.length === 0 && (
        <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-[32px]">
          <p className="text-gray-500">No projects uploaded yet. Check back soon!</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Container linking to dynamic project detail route */}
              <Link href={`/projects/${project.id}`} className="block relative h-[260px] overflow-hidden bg-black/20">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-102 transition duration-500"
                    sizes="(max-w-7xl) 33vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/[0.02]">
                    No Image Available
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-semibold mb-3 tracking-tight group-hover:text-purple-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm line-clamp-3 mb-6">
                  {project.description}
                </p>
              </div>
            </div>

            {/* View Project Action Trigger */}
            <div className="px-7 pb-7 pt-0">
              <Link 
                href={`/projects/${project.id}`} 
                className="inline-flex items-center gap-1.5 text-purple-400 font-medium text-sm group/btn hover:text-purple-300 transition-colors"
              >
                View Project 
                <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}