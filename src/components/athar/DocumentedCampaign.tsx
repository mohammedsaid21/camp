import { motion } from "framer-motion";
import { FIELD_REPORTS, MASJID_DONATE_MESSAGE } from "./data";
import { fadeUp, stagger, viewport } from "./motion";
import { VaultClipPlayer } from "@/components/vault/VaultClipPlayer";
import type { VaultClip } from "@/lib/vault/types";
import { StatusBadge } from "./StatusBadge";
import { ImpactLine } from "./ImpactLine";
import { useGiveMeter } from "./GiveMeter";
import { Heart } from "lucide-react";
import { Button, buttonBase, buttonSizes, buttonVariants } from "./ui/Button";
import { DonateButton } from "./DonateChoice";
import { cn } from "@/lib/utils";

function clipFor(uploads: VaultClip[], projectId: string, titleIncludes?: string) {
  const matches = uploads.filter((item) => item.projectId === projectId);
  if (titleIncludes) {
    const hinted = matches.find((item) => item.title.includes(titleIncludes));
    if (hinted) return hinted;
  }
  return matches[0];
}

function ReportMedia({
  src,
  poster,
  title,
  className,
}: {
  src?: string;
  poster: string;
  title: string;
  className?: string;
}) {
  if (src) {
    return <VaultClipPlayer src={src} poster={poster} title={title} className={className} />;
  }
  return (
    <div className={cn("relative overflow-hidden bg-ivory", className)}>
      <img src={poster} alt={title} className="h-full w-full object-cover" />
    </div>
  );
}

export function DocumentedCampaign({ uploads }: { uploads: VaultClip[] }) {
  const { openMeter } = useGiveMeter();
  const waterClip = clipFor(uploads, "water") ?? clipFor(uploads, "maa");
  const masjidClip = clipFor(uploads, "masjid");

  return (
    <section id="archive" className="athar-section bg-forest text-forest-foreground">
      <div className="athar-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-10 max-w-2xl"
        >
          <p className="type-kicker text-accent">أرشيف التنفيذ</p>
          <h2 className="type-h1 mt-2">الأثر لا يُحكى. يُوثَّق.</h2>
          <p className="mt-3 max-w-[46ch] type-body text-white/70">
            الخبز والإفطار خلصوا من المخيم، بأرقامهم وتصويرهم. الماء والمصلى حاجات جاية، والمساهمة مفتوحة.
          </p>
          <ImpactLine compact inverted className="mt-4" activeKey="document" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
          className="grid gap-5 lg:grid-cols-2"
        >
          {FIELD_REPORTS.map((report) => {
            const clip = clipFor(uploads, report.id, "clipTitleIncludes" in report ? report.clipTitleIncludes : undefined);
            return (
              <motion.article
                key={report.id}
                id={report.id}
                variants={fadeUp}
                className="grid scroll-mt-28 overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
              >
                <ReportMedia
                  src={clip?.videoUrl}
                  poster={clip?.posterUrl ?? report.image}
                  title={report.title}
                  className="aspect-[4/5] max-h-[22rem] w-full md:max-h-none md:h-full"
                />
                <div className="flex flex-col justify-center p-5 md:p-6">
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge tone="complete" label={report.status} />
                    <StatusBadge tone="documented" />
                  </div>
                  <p className="type-stat mt-4">
                    {report.figure}{" "}
                    <span className="align-middle text-lg font-semibold tracking-normal text-white/80">
                      {report.figureLabel}
                    </span>
                  </p>
                  <h3 className="type-h2 mt-2">{report.title}</h3>
                  <p className="mt-2 type-small leading-relaxed text-white/65">{report.lead}</p>
                  <p className="mt-3 type-caption text-white/45">{report.place}</p>
                  <a href="/videos" className="mt-4 type-small font-medium text-accent">
                    شاهد التوثيق
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.article
          id="maa"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-5 grid scroll-mt-28 overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] sm:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)]"
        >
          <ReportMedia
            src={waterClip?.videoUrl}
            poster={waterClip?.posterUrl ?? "/athar/water.jpg"}
            title="شاحنة الماء"
            className="aspect-[4/5] max-h-[16rem] w-full sm:max-h-none sm:h-full"
          />
          <div className="flex flex-col justify-center p-5 md:flex-row md:items-center md:gap-6 md:p-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-1.5">
                <StatusBadge tone="active" label="الحاجة الجاية" className="bg-accent/20 text-accent" />
              </div>
              <h3 className="type-h2 mt-3">شاحنة الماء</h3>
              <p className="mt-2 max-w-[48ch] type-small leading-relaxed text-white/65">
                سقيا المخيم بند تنفيذ، مش شراء شاحنة. التقدير معلن: 100 شخص ≈ 200$. الفيديو من التوزيع على الأرض.
              </p>
            </div>
            <div className="mt-4 flex shrink-0 flex-col gap-2 md:mt-0">
              <button
                type="button"
                onClick={() => openMeter("maa")}
                className={cn(buttonBase, buttonSizes.sm, buttonVariants.donate)}
              >
                <Heart className="relative z-[1] size-4 fill-current" aria-hidden="true" />
                <span className="relative z-[1]">ساهم في السقيا</span>
              </button>
              <Button href="/videos" variant="ghostOnDark" size="sm" arrow={false} className="min-h-11">
                فيديوهات الماء
              </Button>
            </div>
          </div>
        </motion.article>

        <motion.article
          id="masjid"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mt-5 grid scroll-mt-28 overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] sm:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)]"
        >
          <ReportMedia
            src={masjidClip?.videoUrl}
            poster={masjidClip?.posterUrl ?? "/athar/videos/masjid.jpg"}
            title="جهاز صوت للمصلى"
            className="aspect-[4/5] max-h-[16rem] w-full sm:max-h-none sm:h-full"
          />
          <div className="flex flex-col justify-center p-5 md:flex-row md:items-center md:gap-6 md:p-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-1.5">
                <StatusBadge tone="active" label="حملة مفتوحة" className="bg-accent/20 text-accent" />
              </div>
              <h3 className="type-h2 mt-3">جهاز صوت للمصلى</h3>
              <p className="mt-2 max-w-[48ch] type-small leading-relaxed text-white/65">
                أذان وصلاة وحلقات قرآن لأكثر من 300 طالب. التقدير من بيان المشروع: 25,000 إلى 30,000 شيكل، حسب السعر وقت الشراء.
              </p>
              <p className="mt-2 type-caption text-white/45">النصيرات — غرب مقبرة السوارحة</p>
            </div>
            <div className="mt-4 flex shrink-0 flex-col gap-2 md:mt-0">
              <DonateButton message={MASJID_DONATE_MESSAGE} size="sm">
                ساهم في التجهيز
              </DonateButton>
              <Button href="/impact/masjid-sound" variant="ghostOnDark" size="sm" arrow={false} className="min-h-11">
                بيان المشروع
              </Button>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
