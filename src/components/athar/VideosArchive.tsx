import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FIELD_VIDEOS } from "./data";
import { FieldClip } from "./FieldClip";
import { fadeUp, stagger, viewport } from "./motion";
import { VaultClipPlayer } from "@/components/vault/VaultClipPlayer";
import type { VaultClip } from "@/lib/vault/types";
import { fieldVideoProjectId, VIDEO_PROJECTS, videoProjectLabel } from "@/lib/vault/projects";
import { formatAddedAt } from "@/lib/dates";
import { EmptyState } from "./EmptyState";
import { ShareBar } from "./ShareBar";
import { StatusBadge } from "./StatusBadge";
import { ImpactLine } from "./ImpactLine";
import { Button, buttonBase, buttonSizes, buttonVariants } from "./ui/Button";
import { useGiveMeter } from "./GiveMeter";
import { cn } from "@/lib/utils";

type ArchiveItem = {
  key: string;
  title: string;
  place: string;
  video: string;
  poster: string | null;
  projectId: string;
  kind: "field" | "upload";
  createdAt: string | null;
};

const BREAD_PACK = {
  id: "khubz" as const,
  priceUsd: 2,
};

export function VideosArchive({ uploads }: { uploads: VaultClip[] }) {
  const { openMeter } = useGiveMeter();
  const items: ArchiveItem[] = [
    ...uploads.map((clip) => ({
      key: clip.id,
      title: clip.title,
      place: "مخيم نسائم الرحمة",
      video: clip.videoUrl,
      poster: clip.posterUrl,
      projectId: clip.projectId,
      kind: "upload" as const,
      createdAt: clip.createdAt,
    })),
    ...FIELD_VIDEOS.filter((clip) => !uploads.some((item) => item.projectId === fieldVideoProjectId(clip.id))).map(
      (clip) => ({
        key: clip.id,
        title: clip.title,
        place: clip.place,
        video: clip.video,
        poster: clip.image,
        projectId: fieldVideoProjectId(clip.id),
        kind: "field" as const,
        createdAt: null,
      }),
    ),
  ];

  const groups = VIDEO_PROJECTS.map((project) => ({
    ...project,
    clips: items.filter((item) => item.projectId === project.id),
  })).filter((group) => group.clips.length > 0);

  return (
    <section className="bg-surface pt-28 pb-16">
      <div className="athar-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-10 max-w-2xl"
        >
          <p className="type-kicker">أرشيف الفيديو</p>
          <h1 className="type-h1 mt-2">كل التصوير من المخيم، بمكان واحد.</h1>
          <p className="mt-3 type-body text-muted-foreground">
            {uploads.length} فيديوهات من التنفيذ بالميدان. كل فيديو إله صورة من تصويره، وتاريخ إضافته ظاهر
            تحته. اضغط عالفيديو لحتى يشتغل.
          </p>
          <ImpactLine compact className="mt-4" activeKey="document" />
        </motion.div>

        {groups.length === 0 ? (
          <EmptyState
            title="ما في فيديوهات معروضة هون بعد."
            body="لما ينرفع توثيق من المخيم، بيظهر بهالأرشيف. تقدر تشوف مسار العمل من الصفحة الرئيسية."
            action={
              <Button href="/" arrow={false}>
                الصفحة الرئيسية
              </Button>
            }
          />
        ) : (
          groups.map((group) => (
            <section key={group.id} className="mb-12">
              <div className="mb-4">
                <h2 className="type-h2">{group.label}</h2>
                <p className="type-caption text-muted-foreground">{group.clips.length} عمليات</p>
              </div>
              {group.id === BREAD_PACK.id ? (
                <div className="mb-5 flex flex-col gap-3 rounded-lg border border-border bg-ivory px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="type-small text-muted-foreground">
                    كل ربطة خبز لعائلة ={" "}
                    <span className="font-semibold text-foreground">{BREAD_PACK.priceUsd} دولار</span>. بتختار
                    الكمية بالمودال، وبعدين بتكمل على واتساب.
                  </p>
                  <button
                    type="button"
                    onClick={() => openMeter(BREAD_PACK.id)}
                    className={cn(buttonBase, buttonSizes.sm, buttonVariants.donate, "shrink-0")}
                  >
                    <Heart className="relative z-[1] size-4 fill-current" aria-hidden="true" />
                    <span className="relative z-[1]">تبرّع بربطة خبز · {BREAD_PACK.priceUsd}$</span>
                  </button>
                </div>
              ) : null}
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={stagger(0.08)}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {group.clips.map((clip) => (
                  <motion.li key={clip.key} variants={fadeUp} className="athar-card">
                    {clip.kind === "field" && clip.poster ? (
                      <FieldClip src={clip.video} poster={clip.poster} title={clip.title} />
                    ) : (
                      <VaultClipPlayer src={clip.video} poster={clip.poster} title={clip.title} />
                    )}
                    <div className="p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <StatusBadge tone="documented" />
                        {clip.createdAt ? (
                          <time
                            dateTime={clip.createdAt}
                            className="inline-flex min-h-7 items-center rounded-full bg-ivory px-2.5 type-caption font-medium text-foreground"
                          >
                            أُضيف {formatAddedAt(clip.createdAt)}
                          </time>
                        ) : null}
                      </div>
                      <p className="mt-2 type-caption font-medium text-primary">{videoProjectLabel(clip.projectId)}</p>
                      <h3 className="type-h3 mt-1">{clip.title}</h3>
                      <p className="mt-1 type-small text-muted-foreground">{clip.place}</p>
                      {clip.projectId === BREAD_PACK.id ? (
                        <button
                          type="button"
                          onClick={() => openMeter(BREAD_PACK.id)}
                          className={cn(buttonBase, buttonSizes.sm, buttonVariants.donate, "mt-3 w-full")}
                        >
                          <Heart className="relative z-[1] size-4 fill-current" aria-hidden="true" />
                          <span className="relative z-[1]">تبرّع بربطة · {BREAD_PACK.priceUsd}$</span>
                        </button>
                      ) : null}
                      <ShareBar
                        title={
                          clip.createdAt
                            ? `${clip.title} — أُضيف ${formatAddedAt(clip.createdAt)}`
                            : `${clip.title} — أثر`
                        }
                        path="/videos"
                        className="mt-3"
                      />
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </section>
          ))
        )}
      </div>
    </section>
  );
}
