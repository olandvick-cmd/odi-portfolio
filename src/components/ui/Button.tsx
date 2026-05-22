import {
  ButtonHTMLAttributes,
} from "react";

import clsx from "clsx";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode;

  variant?: "primary" | "secondary";

  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: Props) {

  return (
    <button
      {...props}
      className={clsx(
        `
        inline-flex
        items-center
        justify-center
        gap-3
        px-7
        py-4
        rounded-2xl
        font-medium
        transition-all
        duration-300
        active:scale-[0.98]
        disabled:opacity-50
        disabled:pointer-events-none
        `,
        
        variant === "primary" &&
          `
          bg-purple-600
          hover:bg-purple-700
          text-white
          shadow-lg
          shadow-purple-500/20
          `,

        variant === "secondary" &&
          `
          border
          border-white/10
          bg-white/[0.03]
          hover:bg-white/[0.06]
          hover:border-purple-500/20
          text-white
          `,

        fullWidth && "w-full",

        className
      )}
    >
      {children}
    </button>
  );
}