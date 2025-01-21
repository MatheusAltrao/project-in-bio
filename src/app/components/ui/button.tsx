import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 font-bold text-white transition-opacity hover:opacity-80 disabled:opacity-60",
        variant === "primary" && "bg-accent-purple",
        variant === "secondary" && "bg-background-tertiary",
        variant === "tertiary" && "border border-border-primary",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
