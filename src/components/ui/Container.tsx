interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: Props) {

  return (
    <div
      className={`
        w-full
        max-w-7xl
        mx-auto
        px-6
        sm:px-8
        lg:px-10
        xl:px-12
        ${className}
      `}
    >
      {children}
    </div>
  );
}