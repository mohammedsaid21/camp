import { cn } from "@/lib/utils";
import { BRAND_FLOW } from "./data";

type ImpactLineProps = {
  className?: string;
  activeKey?: string;
  compact?: boolean;
  inverted?: boolean;
};

export function ImpactLine({ className, activeKey, compact = false, inverted = false }: ImpactLineProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center",
        compact ? "gap-x-2 gap-y-1" : "gap-x-3 gap-y-2",
        className,
      )}
      aria-label="مسار الأثر"
    >
      {BRAND_FLOW.map((step, index) => {
        const active = !activeKey || activeKey === step.key;
        return (
          <li key={step.key} className="flex items-center gap-2">
            {index > 0 && (
              <span
                className={cn("h-px w-6 sm:w-8", inverted ? "bg-white/20" : "bg-border")}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "inline-flex items-center gap-1.5",
                active
                  ? inverted
                    ? "text-forest-foreground"
                    : "text-foreground"
                  : inverted
                    ? "text-white/45"
                    : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  active ? "bg-accent" : inverted ? "bg-white/30" : "bg-border",
                )}
                aria-hidden="true"
              />
              <span className={cn("font-medium", compact ? "type-caption" : "type-small")}>
                {step.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
