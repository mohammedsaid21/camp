import { motion } from "framer-motion";
import { FIELD_VIDEOS } from "./data";
import { FieldClip } from "./FieldClip";
import { fadeUp, stagger, viewport } from "./motion";
import { VaultClipPlayer } from "@/components/vault/VaultClipPlayer";
import type { VaultClip } from "@/lib/vault/types";
import { fieldVideoProjectId, VIDEO_PROJECTS, videoProjectLabel } from "@/lib/vault/projects";

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
    ...FIELD_VIDEOS.map((clip) => ({
      key: clip.id,
      title: clip.title,
      place: clip.place,
      video: clip.video,
      poster: clip.image,
      projectId: fieldVideoProjectId(clip.id),
      kind: "field" as const,
    })),
    ...uploads.map((clip) => ({
      key: clip.id,
      title: clip.title,
      place: "مخيم نسائم الرحمة",
      video: clip.videoUrl,
      poster: clip.posterUrl,
      projectId: clip.projectId,
      kind: "upload" as const,
    })),
  ];

  const groups = VIDEO_PROJECTS.map((project) => ({
    ...project,
    clips: items.filter((item) => item.projectId === project.id),
  })).filter((group) => group.clips.length > 0);

  return (
    <section className="bg-surface pt-28 pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="mb-8 max-w-2xl"
        >
          <p className="text-sm font-semibold text-primary">أرشيف الفيديو</p>
          <h1 className="mt-1 text-[clamp(1.7rem,4vw,2.4rem)] font-semibold leading-snug">
            كل التصوير من المخيم، بمكان واحد.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {items.length} فيديوهات من التنفيذ بالميدان. اضغط عالفيديو لحتى يشتغل؛ ما بتنزل إلا لما تطلبها، عشان
            الصفحة تضل خفيفة.
          </p>
        </motion.div>

        {groups.map((group) => (
          <section key={group.id} className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">{group.label}</h2>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger(0.08)}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {group.clips.map((clip) => (
                <motion.li
                  key={clip.key}
                  variants={fadeUp}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_32px_#1435280f]"
                >
                  {clip.kind === "field" && clip.poster ? (
                    <FieldClip src={clip.video} poster={clip.poster} title={clip.title} />
                  ) : (
                    <VaultClipPlayer src={clip.video} poster={clip.poster} title={clip.title} />
                  )}
                  <div className="p-4">
                    <p className="text-xs font-medium text-primary">{videoProjectLabel(clip.projectId)}</p>
                    <h3 className="mt-1 text-lg font-semibold">{clip.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{clip.place}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        ))}
      </div>
    </section>
  );
}
