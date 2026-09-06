import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "donate" | "ghost" | "ghostOnDark" | "text";
export type ButtonSize = "default" | "sm";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  size?: ButtonSize;
  arrow?: boolean;
  onClick?: () => void;
};

export const buttonBase =
  "btn-shine inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 font-semibold transition-[transform,background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const buttonSizes: Record<ButtonSize, string> = {
  default: "rounded-full px-6 py-2.5 text-sm",
  sm: "rounded-full px-5 py-2 text-sm",
};

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-forest",
  secondary: "border border-border bg-card text-foreground hover:bg-ivory",
  donate: "bg-accent text-accent-foreground hover:bg-ember",
  ghost: "border border-primary/25 bg-card text-primary hover:border-primary hover:bg-ivory",
  ghostOnDark: "border border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20",
  text: "rounded-none border-b border-accent px-0 pb-0.5 text-foreground shadow-none hover:text-primary",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  size = "default",
  arrow = true,
  onClick,
}: ButtonProps) {
  const showHeart = variant === "donate";
  const showArrow = arrow && variant !== "text" && variant !== "donate";

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ y: variant === "text" ? 0 : -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
    >
      {showHeart && <Heart className="relative z-[1] size-4 fill-current" aria-hidden="true" />}
      <span className="relative z-[1]">{children}</span>
      {showArrow && <ArrowLeft className="relative z-[1] size-4" aria-hidden="true" />}
    </motion.a>
  );
}
