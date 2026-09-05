import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "donate" | "ghost" | "ghostOnDark" | "link";
  className?: string;
  size?: "default" | "sm";
  arrow?: boolean;
  onClick?: () => void;
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
  const base =
    "btn-shine inline-flex min-h-11 items-center justify-center gap-2 font-semibold transition-[transform,box-shadow,background] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const sizes = {
    default: "rounded-full px-7 py-3 text-sm",
    sm: "rounded-full px-5 py-2.5 text-sm",
  };

  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_10px_24px_#1b7a4a44] hover:bg-[#166c41]",
    donate:
      "btn-donate bg-accent text-accent-foreground shadow-[0_10px_24px_#f26b214d] hover:bg-ember",
    ghost:
      "border-2 border-primary/30 bg-white text-primary hover:border-primary hover:bg-ivory",
    ghostOnDark:
      "border border-white/45 bg-white/10 text-white hover:border-white hover:bg-white/20",
    link: "rounded-none border-b-2 border-accent px-0 pb-0.5 text-accent shadow-none hover:border-ember",
  };

  const showHeart = variant === "donate";
  const showArrow = arrow && variant !== "link" && variant !== "donate";

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileHover={{ y: variant === "link" ? 0 : -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {showHeart && (
        <Heart className="relative z-[1] h-4 w-4 fill-current" aria-hidden="true" />
      )}
      <span className="relative z-[1]">{children}</span>
      {showArrow && (
        <ArrowLeft className="relative z-[1] h-4 w-4" aria-hidden="true" />
      )}
    </motion.a>
  );
}
