export function projectPoster(id: string) {
  if (id.startsWith("khubz")) return "/athar/videos/khubz.jpg";
  if (id === "helw" || id === "iftar") return "/athar/videos/helw.jpg";
  if (id === "bard") return "/athar/videos/bard.jpg";
  if (id === "masjid") return "/athar/videos/masjid.jpg";
  if (id === "water") return "/athar/water.jpg";
  if (id === "food") return "/athar/packs.jpg";
  return "/athar/hero.jpg";
}
