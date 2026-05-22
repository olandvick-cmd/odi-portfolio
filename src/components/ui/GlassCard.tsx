interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: Props) {

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-white/[0.03]
        border
        border-white/10
        backdrop-blur-xl
        rounded-[32px]
        shadow-2xl
        transition
        hover:border-purple-500/20
        hover:bg-white/[0.04]
        ${className}
      `}
    >

      {/* Top Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}