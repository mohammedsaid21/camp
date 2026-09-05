import { createFileRoute } from "@tanstack/react-router";
import { ImpactThanks } from "@/components/impact/ImpactThanks";
import { parseContributeAmount } from "@/lib/impact/format";
import { Route as SlugRoute } from "./route";

export const Route = createFileRoute("/impact/$slug/thanks")({
  validateSearch: (search: Record<string, unknown>) => {
    const amount = search["amount"];
    if (typeof amount === "string" && amount.length > 0) {
      return { amount };
    }
    return {};
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  component: ImpactThanksPage,
});

function ImpactThanksPage() {
  const { project } = SlugRoute.useLoaderData();
  const search = Route.useSearch();
  const amount = parseContributeAmount("amount" in search ? search.amount : undefined);
  return <ImpactThanks project={project} amount={amount} />;
}
