import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DONATE_PATH } from "./data";
import { fadeUp, stagger, viewport } from "./motion";

export function PathSteps({ className }: { className?: string }) {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger(0.05)}
      className={cn(
        "relative flex flex-col md:grid md:grid-cols-5 md:gap-x-2",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute start-4 top-4 bottom-4 w-px bg-border md:hidden"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-4 start-[10%] end-[10%] hidden h-px bg-border md:block"
        aria-hidden="true"
      />
      {DONATE_PATH.map((step) => (
        <motion.li
          key={step.n}
          variants={fadeUp}
          className="relative flex gap-3 pb-5 last:pb-0 md:block md:pb-0 md:text-center"
        >
          <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground md:mx-auto">
            {Number(step.n)}
          </span>
          <div className="min-w-0 md:mt-3">
            <h3 className="font-semibold">{step.t}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
