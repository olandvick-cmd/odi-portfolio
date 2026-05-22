interface Props {
  testimonials: any[];
}

export default function Testimonials({
  testimonials,
}: Props) {

  return (
    <section className="py-32">

      {/* Header */}
      <div className="mb-14">

        <span className="text-sm uppercase tracking-[0.3em] text-purple-400">
          Testimonials
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          What clients say.
        </h2>

      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {testimonials.map((item) => (

          <div
            key={item.id}
            className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8"
          >

            <p className="text-gray-300 leading-relaxed mb-8">
              “{item.message}”
            </p>

            <div>

              <h4 className="font-semibold text-lg">
                {item.name}
              </h4>

              <p className="text-gray-500">
                {item.role}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}