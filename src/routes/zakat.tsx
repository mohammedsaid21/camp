import { createFileRoute } from "@tanstack/react-router";
import { Footer, Navbar } from "@/components/athar";
import { ZakatPage } from "@/components/zakat/ZakatPage";

export const Route = createFileRoute("/zakat")({
  head: () => ({
    meta: [
      { title: "احسب زكاتك — أثر" },
      {
        name: "description",
        content: "حاسبة زكاة مال تعتمد نصاب الذهب عيار 21 وفق دار الإفتاء المصرية، مع تفصيل النتيجة دون افتراض فتوى.",
      },
      { property: "og:title", content: "احسب زكاتك — أثر" },
      { property: "og:image", content: "/athar/غزة.jpeg" },
    ],
  }),
  component: ZakatRoute,
});

function ZakatRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main">
        <ZakatPage />
      </main>
      <Footer />
    </div>
  );
}
