import Image from "next/image";

interface Props {
  projects: any[];
}

export default function Projects({
  projects,
}: Props) {

  return (
    <section className="py-32">

      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-14">

        <div>

          <span className="text-sm uppercase tracking-[0.3em] text-purple-400">
            Featured Projects
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Selected work &
            creative projects.
          </h2>

        </div>

      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {projects.map((project) => (

          <div
            key={project.id}
            className="group bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden hover:border-purple-500/20 transition"
          >

            {/* Image */}
            <div className="relative h-[260px] overflow-hidden">

              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              )}

            </div>

            {/* Content */}
            <div className="p-7">

              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                {project.description}
              </p>

              <button className="text-purple-400 font-medium">
                View Project →
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}