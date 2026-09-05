import { motion } from "framer-motion";
import { TRUST } from "./data";
import { fadeUp, viewport } from "./motion";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 border-y border-border bg-ivory py-4 md:py-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 md:px-10"
      >
        <h2 className="text-sm font-semibold whitespace-nowrap md:text-base">
          قائم على الإثبات، لا الوعود
        </h2>
        <span className="hidden h-4 w-px bg-border md:block" aria-hidden="true" />
        {TRUST.map((item, i) => (
          <span key={item.n} className="flex items-center gap-4 text-sm text-muted-foreground">
            {i > 0 && (
              <span className="hidden text-border md:inline" aria-hidden="true">
                ·
              </span>
            )}
            {item.t}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
