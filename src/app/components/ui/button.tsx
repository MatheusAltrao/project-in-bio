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
        "whitespace-nowrap rounded-xl p-2 font-bold text-white transition-opacity hover:opacity-80 disabled:opacity-60",
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
