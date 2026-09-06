import { motion } from "framer-motion";
import { FIELD_VIDEOS } from "./data";
import { FieldClip } from "./FieldClip";
import { fadeUp, stagger, viewport } from "./motion";
import { VaultClipPlayer } from "@/components/vault/VaultClipPlayer";
import type { VaultClip } from "@/lib/vault/types";
import { fieldVideoProjectId, VIDEO_PROJECTS, videoProjectLabel } from "@/lib/vault/projects";
import { projectPoster } from "@/lib/vault/projectPoster";
import { EmptyState } from "./EmptyState";
import { ShareBar } from "./ShareBar";
import { StatusBadge } from "./StatusBadge";
import { ImpactLine } from "./ImpactLine";
import { Button } from "./ui/Button";

type ArchiveItem = {
  key: string;
  title: string;
  place: string;
  video: string;
  poster: string | null;
  projectId: string;
  kind: "field" | "upload";
};

export function VideosArchive({ uploads }: { uploads: VaultClip[] }) {
  const items: ArchiveItem[] = [
    ...uploads.map((clip) => ({
      key: clip.id,
      title: clip.title,
      place: "مخيم نسائم الرحمة",
      video: clip.videoUrl,
      poster: clip.posterUrl ?? projectPoster(clip.projectId),
      projectId: clip.projectId,
      kind: "upload" as const,
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
            {uploads.length} فيديوهات من التنفيذ بالميدان. اضغط عالفيديو لحتى يشتغل؛ ما بتنزل إلا لما تطلبها، عشان الصفحة
            تضل خفيفة.
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
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <h2 className="type-h2">{group.label}</h2>
                <p className="type-caption text-muted-foreground">{group.clips.length} عمليات</p>
              </div>
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
                      <StatusBadge tone="documented" />
                      <p className="mt-2 type-caption font-medium text-primary">{videoProjectLabel(clip.projectId)}</p>
                      <h3 className="type-h3 mt-1">{clip.title}</h3>
                      <p className="mt-1 type-small text-muted-foreground">{clip.place}</p>
                      <ShareBar title={`${clip.title} — أثر`} path="/videos" className="mt-3" />
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
