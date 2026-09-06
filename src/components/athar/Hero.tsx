import { motion } from "framer-motion";
import { HERO_IMAGE } from "./data";
import { Button } from "./ui/Button";
import { DonateButton } from "./DonateChoice";
import { ImpactLine } from "./ImpactLine";
import { fadeUp, imageReveal, stagger } from "./motion";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden scroll-mt-24 pt-24 pb-10 md:pt-28 md:pb-14">
      <div className="athar-wrap">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.08)}>
            <motion.h1 variants={fadeUp} className="type-display mt-1 md:max-w-[18ch]">
              <span className="block font-light">العطاء لا ينتهي عند التبرع.</span>
              <span className="mt-1 block">
                هناك يبدأ <span className="text-accent">الأثر.</span>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="type-lead mt-4 max-w-[44ch] text-muted-foreground">
              قبل أن نطلب دعمك، نريك أين وصل عطاؤنا، وكيف تحوّل إلى أثرٍ حقيقي موثّق.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#archive" className="w-full sm:w-auto">
                شوف التوثيق
              </Button>
              <DonateButton className="w-full sm:w-auto">تبرع الآن</DonateButton>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <ImpactLine compact />
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={imageReveal}>
            <div className="group relative aspect-[16/9] overflow-hidden rounded-lg border border-border sm:aspect-[16/10] lg:aspect-[5/4]">
              <img
                src={HERO_IMAGE}
                alt="توثيق ميداني لتجهيز مساعدات إنسانية في مخيم نسائم الرحمة"
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
              <div className="absolute bottom-3 start-3 rounded-full border border-border/70 bg-background/92 px-3 py-1 type-caption font-medium backdrop-blur-sm">
                مخيم نسائم الرحمة
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
