import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { FIELD_REPORTS } from "./data";
import { FieldClip } from "./FieldClip";
import { fadeUp, stagger, viewport } from "./motion";
import { useGiveMeter } from "./GiveMeter";

function ReportFacts({
  report,
}: {
  report: (typeof FIELD_REPORTS)[number];
}) {
  const [open, setOpen] = useState(false);

  const rows = [
    { k: "الموقع", v: report.place },
    { k: "تاريخ التنفيذ", v: report.date ?? "يُضاف من سجل التنفيذ" },
    { k: "المستفيدون", v: `${report.figure} ${report.figureLabel}` },
    { k: "الكمية", v: report.quantity ?? "يُضاف من سجل التنفيذ" },
    { k: "تكلفة المشروع", v: report.cost ?? "يُضاف من سجل التنفيذ" },
  ];

  return (
    <>
      <dl className="mt-3 space-y-1.5 text-sm">
        {rows.map((row) => (
          <div key={row.k} className="flex justify-between gap-3 border-b border-border/70 py-1.5">
            <dt className="text-muted-foreground">{row.k}</dt>
            <dd className="text-end font-medium">{row.v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-xs text-muted-foreground">{report.scope}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 text-sm font-medium text-primary"
        aria-expanded={open}
      >
        {open ? "إخفاء السجل" : "عرض سجل المشروع"}
      </button>
      {open && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{report.record}</p>}
    </>
  );
}

export function DocumentedCampaign() {
  const { openMeter } = useGiveMeter();

  return (
    <section id="archive" className="scroll-mt-24 bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-8 flex flex-wrap items-end justify-between gap-3"
        >
          <div>
            <p className="text-sm font-semibold text-primary">أرشيف التنفيذ</p>
            <h2 className="mt-1 text-2xl font-semibold md:text-[1.75rem]">كل رقم إله سجل.</h2>
          </div>
          <div className="flex max-w-[36ch] flex-col items-start gap-2">
            <p className="text-sm text-muted-foreground">
              الأرقام من التنفيذ بالمخيم. اللي لسا ما انرفق بسجل الشراء، منتركه فارغ بدل ما نخترعه.
            </p>
            <a href="/videos" className="text-sm font-medium text-primary">
              كل الفيديوهات
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
          className="grid gap-6 md:grid-cols-3"
        >
          {FIELD_REPORTS.map((report) => (
            <motion.article
              key={report.id}
              id={report.id}
              variants={fadeUp}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_32px_#1435280f] scroll-mt-28"
            >
              <FieldClip src={report.video} poster={report.image} title={report.title} />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium text-leaf">{report.status}</p>
                <h3 className="mt-1 text-lg font-semibold">{report.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{report.lead}</p>
                <ReportFacts report={report} />
                {report.id === "khubz" && (
                  <button
                    type="button"
                    onClick={() => openMeter("khubz")}
                    className="btn-shine mt-4 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    كم عائلة بدك تطعم؟
                  </button>
                )}
              </div>
            </motion.article>
          ))}

          <motion.article
            id="maa"
            variants={fadeUp}
            className="flex flex-col overflow-hidden rounded-2xl bg-forest p-4 text-forest-foreground shadow-[0_12px_32px_#0f3d2e33] scroll-mt-28"
          >
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-white/10">
              {/* <img src="/athar/water.jpg" alt="" className="h-full w-full object-cover opacity-80" /> */}
              <div className="absolute inset-0 bg-forest/40" />
              <Droplets className="absolute bottom-4 start-4 h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs text-white/55">فرصة عطاء · تقدير تكلفة</p>
            <h3 className="mt-1.5 text-lg font-semibold">شاحنة الماء</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              200$ تكلفة تقديرية لتوفير الماء لـ100 شخص حسب تكلفة التنفيذ الحالية.
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              {[
                { k: "يشمل التقدير", v: "شراء الماء، النقل، التوزيع" },
                { k: "ما يشمل", v: "شراء شاحنة" },
                { k: "اللتر والأيام", v: "بتننشر مع كل تنفيذ" },
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-3 border-b border-white/15 py-1.5">
                  <dt className="text-white/55">{row.k}</dt>
                  <dd className="text-end">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto border-t border-white/15 pt-3">
              <span className="font-display text-2xl text-accent">100</span>
              <span className="ms-2 text-xs text-white/55">شخص ≈ 200$</span>
            </div>
            <button
              type="button"
              onClick={() => openMeter("maa")}
              className="btn-shine mt-3 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"
            >
              احسب التقدير
            </button>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
