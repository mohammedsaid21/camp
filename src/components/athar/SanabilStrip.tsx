import { motion } from "framer-motion";
import { FIELD_REPORTS } from "./data";
import { fadeUp, stagger, viewport } from "./motion";

export function SanabilStrip() {
  return (
    <section className="bg-background py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-6 text-center"
        >
          <p className="text-sm font-semibold text-primary">من الحبة للسنبلة</p>
          <h2 className="mt-1 text-2xl font-semibold">الصدقة ما بتختفي. بتتشاف.</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
          className="grid items-stretch gap-3 md:grid-cols-[minmax(0,0.8fr)_repeat(2,minmax(0,1fr))] md:gap-4"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center justify-center rounded-2xl bg-forest px-5 py-6 text-center text-forest-foreground"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf text-lg font-bold text-white">
              ١
            </span>
            <p className="font-verse mt-3 text-lg leading-snug">حبة واحدة</p>
            <p className="mt-1 text-xs text-white/65">صدقك اليوم</p>
          </motion.div>

          {FIELD_REPORTS.map((report) => (
            <motion.a
              key={report.id}
              href={`#${report.id}`}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-[0_10px_24px_#1435280c] transition-transform hover:-translate-y-0.5"
            >
              <p className="text-xs font-medium text-leaf">{report.kind}</p>
              <p className="mt-1 font-semibold">{report.title}</p>
              <p className="mt-auto pt-3 font-display text-xl text-accent">
                {report.figure}
                <span className="ms-1 text-xs font-sans font-normal text-muted-foreground">
                  {report.figureLabel}
                </span>
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
