import { createFileRoute } from "@tanstack/react-router";
import { VaultPage } from "@/components/vault/VaultPage";
import { getVaultState } from "@/lib/vault/vault.functions";

export const Route = createFileRoute("/ayla")({
  head: () => ({
    meta: [
      { title: "خاص" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: () => getVaultState(),
  component: AylaRoute,
});

function AylaRoute() {
  const initial = Route.useLoaderData();
  return <VaultPage initial={initial} />;
}
