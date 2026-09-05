import { motion } from "framer-motion";
import { BRAND_FLOW, HERO_IMAGE } from "./data";
import { Button } from "./ui/Button";
import { DonateButton } from "./DonateChoice";
import { fadeUp, imageReveal, stagger } from "./motion";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden scroll-mt-24 pt-[5.5rem] pb-6 md:pt-28 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1)}
          >
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(1.85rem,8.5vw,3.6rem)] leading-[1.15] tracking-tight md:max-w-[14ch] md:leading-[1.1]"
            >
              <span className="block font-light">لكل تبرع أثر.</span>
              <span className="mt-0.5 block font-bold">
                لكل أثر <span className="text-accent">دليل.</span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base"
            >
              مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ، وَتَرَاحُمِهِمْ، كَمَثَلِ الْجَسَدِ الْوَاحِدِ
              </motion.p>

            <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button href="#archive" className="w-full sm:w-auto">
                شوف التوثيق
              </Button>
              <DonateButton className="w-full sm:w-auto">تبرع الآن</DonateButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground md:mt-6 md:text-sm"
            >
              {BRAND_FLOW.map((step, i) => (
                <span key={step.key} className="flex items-center gap-2">
                  {i > 0 && <span className="text-border">→</span>}
                  <span className="font-medium text-foreground">{step.label}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageReveal}
          >
            <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-border sm:aspect-[16/10] lg:aspect-[5/4]">
              <img
                src={HERO_IMAGE}
                alt="توثيق ميداني لتجهيز مساعدات إنسانية"
                loading="eager"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 start-3 rounded-full border border-border/70 bg-background/92 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                مخيم نسائم الرحمة
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
