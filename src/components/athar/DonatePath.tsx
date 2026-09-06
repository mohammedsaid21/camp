import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DONATE_ORIGINS, originWhatsapp } from "./data";
import { fadeUp, viewport } from "./motion";
import { PathSteps } from "./PathSteps";

export function DonatePath() {
  return (
    <section id="path" className="athar-section bg-background">
      <div className="athar-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-5 max-w-2xl"
        >
          <p className="type-kicker">قصة التبرع</p>
          <h2 className="type-h2 mt-2">من غزة أو برا غزة — نفس الأثر.</h2>
          <p className="mt-2 type-body text-muted-foreground">
            التبرع بيوصل للمخيم من المكانين. بتختار الرقم حسب مكانك، وبعدها نفس الشغل.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="rounded-lg bg-forest p-2 text-forest-foreground"
        >
          <div className="px-4 pb-4 pt-5 md:px-6 md:pt-6">
            <p className="text-sm font-semibold text-leaf">وين بدك تتواصل من؟</p>
            <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-white/70">
              نفس التنفيذ بالمخيم. الفرق بس برقم الواتساب.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2">
            {DONATE_ORIGINS.map((origin) => {
              const isOutside = origin.id === "outside";
              return (
                <motion.a
                  key={origin.id}
                  href={originWhatsapp(origin.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "btn-shine flex min-h-[5.5rem] flex-col justify-center px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 focus-visible:ring-offset-2 focus-visible:ring-offset-forest",
                    isOutside
                      ? "btn-donate bg-accent text-accent-foreground"
                      : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <span className={cn("text-[11px] font-medium", isOutside ? "text-accent-foreground/75" : "text-white/55")}>
                    {origin.kicker}
                  </span>
                  <span className="mt-1 flex items-center gap-2 text-base font-semibold">
                    {isOutside && <Heart className="h-4 w-4 fill-current" aria-hidden="true" />}
                    {origin.label}
                    {!isOutside && <ArrowLeft className="h-4 w-4" aria-hidden="true" />}
                  </span>
                  <span className={cn("mt-0.5 text-xs", isOutside ? "text-accent-foreground/80" : "text-white/70")}>
                    واتساب {origin.code}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-4 rounded-lg bg-ivory px-5 py-6 md:px-8 md:py-7"
        >
          <p className="text-sm font-semibold">بعد الرسالة، نفس المسار.</p>
          <PathSteps className="mt-5" />
        </motion.div>
      </div>
    </section>
  );
}
