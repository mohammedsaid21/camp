import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getImpactProject } from "@/lib/impact/catalog";

export const Route = createFileRoute("/impact/$slug")({
  loader: ({ params }) => {
    const project = getImpactProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const title = project ? `${project.title} | اصنع أثرًا | أثر` : "اصنع أثرًا | أثر";
    const description = project?.summary ?? "اختر مشروعًا وكن جزءًا من أثر حقيقي.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ImpactSlugLayout,
});

function ImpactSlugLayout() {
  return <Outlet />;
}
