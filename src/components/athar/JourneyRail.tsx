import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BRAND_FLOW } from "./data";

const STAGE_SECTIONS: Record<string, string[]> = {
  give: ["top", "donate"],
  execute: ["path"],
  document: ["archive"],
  impact: ["impact"],
};

export function JourneyRail() {
  const [active, setActive] = useState<string>("give");

  useEffect(() => {
    const nodes = Object.values(STAGE_SECTIONS)
      .flat()
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const stage = BRAND_FLOW.find((step) => STAGE_SECTIONS[step.key]?.includes(visible.target.id));
        if (stage) setActive(stage.key);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="مسار التبرع"
      className="pointer-events-none fixed top-1/2 z-40 hidden -translate-y-1/2 end-4 xl:block"
    >
      <ol className="pointer-events-auto flex flex-col rounded-lg border border-border bg-card/95 px-3 py-3 shadow-card backdrop-blur-sm">
        {BRAND_FLOW.map((step, index) => {
          const href = `#${STAGE_SECTIONS[step.key]?.[0] ?? "top"}`;
          const isActive = active === step.key;
          return (
            <li key={step.key} className="flex flex-col">
              {index > 0 && <span className="ms-[3px] h-4 w-px bg-border" aria-hidden="true" />}
              <a
                href={href}
                className="flex items-center gap-2 py-0.5"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn("size-1.5 rounded-full", isActive ? "bg-accent" : "bg-border")}
                  aria-hidden="true"
                />
                <span className={cn("type-caption", isActive ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {step.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
