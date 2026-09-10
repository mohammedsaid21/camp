import { createFileRoute } from "@tanstack/react-router";
import { Navbar, VideosArchive, Footer, StickyMobileCTA, GiveMeterProvider } from "@/components/athar";
import { getPublicVideos } from "@/lib/vault/vault.functions";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "الفيديوهات — أثر" },
      {
        name: "description",
        content: "كل فيديوهات التوثيق من مخيم نسائم الرحمة: توزيع الخبز، الحلو، البرد، ومناشدة المسجد.",
      },
      { property: "og:title", content: "الفيديوهات — أثر" },
      {
        property: "og:description",
        content: "أرشيف فيديو من التنفيذ الميداني في مخيم نسائم الرحمة.",
      },
      { property: "og:image", content: "/athar/غزة.jpeg" },
    ],
  }),
  loader: () => getPublicVideos(),
  component: VideosPage,
});

function VideosPage() {
  const uploads = Route.useLoaderData();
  return (
    <GiveMeterProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main id="main">
          <VideosArchive uploads={uploads} />
        </main>
        <Footer />
        <StickyMobileCTA />
      </div>
    </GiveMeterProvider>
  );
}
