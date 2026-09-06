import { motion } from "framer-motion";
import { ABOUT, DONATE_ORIGINS, originWhatsapp } from "./data";
import { Button } from "./ui/Button";
import { fadeUp, stagger, viewport } from "./motion";

export function AboutSection() {
  return (
    <section id="about" className="athar-section bg-ivory">
      <div className="athar-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="type-kicker">{ABOUT.kicker}</p>
          <h2 className="type-h1 mt-2">{ABOUT.title}</h2>
          <div className="mt-5 space-y-3 type-body text-muted-foreground">
            {ABOUT.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.06)}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {ABOUT.blocks.map((block) => (
            <motion.article
              key={block.id}
              variants={fadeUp}
              className="athar-card p-4"
            >
              <h3 className="font-semibold">{block.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.d}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <p className="w-full text-sm text-muted-foreground">
            للتبرع والاستفسار، تواصل معنا عبر واتساب حسب مكانك:
          </p>
          <div className="flex flex-wrap gap-2">
            {DONATE_ORIGINS.map((origin) => (
              <Button
                key={origin.id}
                href={originWhatsapp(origin.id)}
                variant={origin.id === "outside" ? "donate" : "primary"}
                size="sm"
              >
                {origin.label} ({origin.code})
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
