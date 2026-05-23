interface Props {
  testimonials: any[];
}

export default function Testimonials({ testimonials }: Props) {
  return (
    <section className="py-32">
      
      {/* Header */}
      <div className="mb-14">
        <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">
          What clients say.
        </h2>
      </div>

      {/* Empty State Fallback */}
      {testimonials.length === 0 && (
        <div className="text-center py-16 border border-white/5 bg-white/[0.01] rounded-[32px]">
          <p className="text-gray-500">No testimonials added yet. Delivering impact daily!</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {testimonials.map((item) => {
          // Get user initials to build a beautiful automatic avatar if an image string isn't stored
          const initials = item.name ? item.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "C";

          return (
            <div
              key={item.id}
              className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Review Message Text */}
              <p className="text-gray-300 leading-relaxed mb-8 italic text-[15px]">
                &ldquo;{item.message}&rdquo;
              </p>

              {/* Client Profile Info Wrapper */}
              <div className="flex items-center gap-4">
                
                {/* Visual Avatar Element */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 flex items-center justify-center text-white font-bold text-sm border border-white/10 shrink-0 shadow-lg shadow-purple-600/10">
                  {initials}
                </div>

                <div>
                  <h4 className="font-semibold text-white tracking-tight">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">
                    {item.role} {item.company && <span className="text-purple-400">@ {item.company}</span>}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}