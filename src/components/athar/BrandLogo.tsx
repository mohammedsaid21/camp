import { cn } from "@/lib/utils";

const MARK = "/athar/logo-mark.png";
const LOCKUP = "/athar/logo-lockup.jpeg";

export function BrandLogo({
  variant = "nav",
  className,
}: {
  variant?: "nav" | "footer";
  className?: string;
}) {
  if (variant === "footer") {
    return (
      <a href="/" className={cn("inline-block", className)}>
        <img
          src={LOCKUP}
          alt="أثر — العطاء لا ينتهي عند التبرع. هناك يبدأ الأثر."
          className="h-28 w-auto object-contain sm:h-32"
        />
      </a>
    );
  }

  return (
    <a href="/" className={cn("flex items-center gap-2.5", className)}>
      <img
        src={MARK}
        alt=""
        className="h-9 w-9 rounded-md bg-ivory object-contain sm:h-10 sm:w-10"
      />
      <span className="font-display text-[1.65rem] leading-none tracking-tight text-white">أثر</span>
    </a>
  );
}
