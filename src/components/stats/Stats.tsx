import Container from "../ui/Container";

const stats = [
  {
    number: "20+",
    label: "Projects Completed",
  },
  {
    number: "15+",
    label: "Happy Clients",
  },
  {
    number: "5+",
    label: "Years Experience",
  },
  {
    number: "∞",
    label: "Ideas & Passion",
  },
];

export default function Stats() {
  return (
    <section className="pb-28">

      <Container>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/10 rounded-[30px] p-8 backdrop-blur-xl hover:border-purple-500/20 transition"
            >

              <h3 className="text-4xl font-bold text-purple-400 mb-3">
                {stat.number}
              </h3>

              <p className="text-gray-400">
                {stat.label}
              </p>

            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}