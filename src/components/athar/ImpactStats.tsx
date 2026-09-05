import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { STATS, STATS_NOTE } from "./data";
import { fadeUp, stagger, viewport } from "./motion";

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);

  return value;
}

function StatItem({ value, prefix, label }: { value: number; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(value, inView);

  return (
    <motion.div ref={ref} variants={fadeUp} className="py-5">
      <div className="font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-tight text-accent">
        {prefix}
        {count.toLocaleString("en-US")}
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground md:text-sm">{label}</div>
    </motion.div>
  );
}

export function ImpactStats() {
  return (
    <section id="impact" className="scroll-mt-24 border-y border-border bg-card">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.06)}
        className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-3 md:px-10"
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "px-2 md:px-4",
              index % 2 === 1 && "border-s border-border",
              index >= 2 && "border-t border-border md:border-t-0",
              index > 0 && "md:border-s",
            )}
          >
            <StatItem {...stat} />
          </div>
        ))}
      </motion.div>
      <p className="mx-auto max-w-7xl px-5 pb-4 text-xs text-muted-foreground md:px-10">
        {STATS_NOTE}
      </p>
    </section>
  );
}
