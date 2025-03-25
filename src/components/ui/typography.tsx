import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "muted";
  className?: string;
  children: ReactNode;
}

export const Typography = ({ variant = "body", className, children }: TypographyProps) => {
  const baseStyles = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-medium tracking-tight",
    h4: "text-xl font-medium",
    body: "text-base",
    small: "text-sm text-gray-500",
    muted: "text-sm text-gray-400",
  };

  return <p className={cn(baseStyles[variant], className)}>{children}</p>;
};
