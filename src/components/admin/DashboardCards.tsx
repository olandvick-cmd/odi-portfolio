const cards = [
  {
    title: "Projects",
    value: "12",
  },
  {
    title: "Views",
    value: "4.2k",
  },
  {
    title: "Messages",
    value: "18",
  },
  {
    title: "Uploads",
    value: "32",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/[0.03] border border-white/10 rounded-[30px] p-8"
        >

          <p className="text-gray-400 mb-3">
            {card.title}
          </p>

          <h3 className="text-4xl font-bold text-white">
            {card.value}
          </h3>

        </div>
      ))}

    </div>
  );
}