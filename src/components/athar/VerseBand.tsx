import { motion } from "framer-motion";
import { fadeUp, viewport } from "./motion";

type VerseBandProps = {
  ayah: string;
  surah: string;
  tone?: "light" | "leaf";
};

export function VerseBand({ ayah, surah, tone = "light" }: VerseBandProps) {
  return (
    <section
      className={
        tone === "leaf"
          ? "bg-forest py-5 text-forest-foreground"
          : "border-y border-border bg-ivory py-5"
      }
    >
      <motion.figure
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="mx-auto max-w-4xl px-5 text-center md:px-10"
      >
        <blockquote className="font-verse text-lg leading-loose md:text-xl">{ayah}</blockquote>
        <figcaption
          className={`mt-1 text-xs ${tone === "leaf" ? "text-white/65" : "text-muted-foreground"}`}
        >
          {surah}
        </figcaption>
      </motion.figure>
    </section>
  );
}
