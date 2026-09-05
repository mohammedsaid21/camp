import { createFileRoute } from "@tanstack/react-router";
import { ImpactHome } from "@/components/impact/ImpactHome";
import { loadImpactProjects } from "@/lib/impact/catalog";

export const Route = createFileRoute("/impact/")({
  loader: () => loadImpactProjects(),
  head: () => ({
    meta: [
      { title: "اصنع أثرًا | أثر" },
      { name: "description", content: "اختر مشروعًا وكن جزءًا من أثر حقيقي." },
      { property: "og:title", content: "اصنع أثرًا | أثر" },
      { property: "og:description", content: "اختر مشروعًا وكن جزءًا من أثر حقيقي." },
    ],
  }),
  component: ImpactIndex,
});

function ImpactIndex() {
  const initialProjects = Route.useLoaderData();
  return <ImpactHome initialProjects={initialProjects} />;
}
