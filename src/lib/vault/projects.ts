export const VIDEO_PROJECTS = [
  { id: "khubz", label: "توزيع الخبز" },
  { id: "iftar", label: "إفطار صائم" },
  { id: "helw", label: "توزيع الحلو" },
  { id: "bard", label: "توزيع البرد" },
  { id: "masjid", label: "مناشدة المسجد" },
  { id: "water", label: "المياه" },
  { id: "food", label: "إطعام عائلات" },
  { id: "other", label: "أخرى" },
] as const;

export type VideoProjectId = (typeof VIDEO_PROJECTS)[number]["id"];

export const VIDEO_PROJECT_IDS = VIDEO_PROJECTS.map((item) => item.id) as [VideoProjectId, ...VideoProjectId[]];

export function isVideoProjectId(value: string): value is VideoProjectId {
  return VIDEO_PROJECTS.some((item) => item.id === value);
}

export function videoProjectLabel(id: string) {
  return VIDEO_PROJECTS.find((item) => item.id === id)?.label ?? "أخرى";
}

export function fieldVideoProjectId(id: string): VideoProjectId {
  if (id.startsWith("khubz")) return "khubz";
  if (id === "iftar") return "iftar";
  if (id === "helw") return "helw";
  if (id === "bard") return "bard";
  if (id === "masjid") return "masjid";
  if (id === "maa" || id === "water") return "water";
  return "other";
}
