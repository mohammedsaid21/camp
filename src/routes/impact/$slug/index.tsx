import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/impact/ProjectDetail";
import { Route as SlugRoute } from "./route";

export const Route = createFileRoute("/impact/$slug/")({
  component: ImpactProjectPage,
});

function ImpactProjectPage() {
  const { project } = SlugRoute.useLoaderData();
  return <ProjectDetail project={project} />;
}
