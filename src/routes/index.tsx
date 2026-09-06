import { createFileRoute } from "@tanstack/react-router";
import {
  Navbar,
  Hero,
  ImpactStats,
  DonatePath,
  TrustSection,
  DocumentedCampaign,
  DonorFaq,
  SadaqaSection,
  AboutSection,
  Footer,
  StickyMobileCTA,
  VerseBand,
  GiveMeterProvider,
} from "@/components/athar";
import { JourneyRail } from "@/components/athar/JourneyRail";
import { getPublicVideos } from "@/lib/vault/vault.functions";

export const Route = createFileRoute("/")({
  loader: () => getPublicVideos(),
  head: () => ({
    meta: [
      { title: "أثر — لكل تبرع أثر، ولكل أثر دليل" },
      {
        name: "description",
        content:
          "أثر بتوثّق شغلها بمخيم نسائم الرحمة: ربطات خبز لحوالي 80 عائلة، وإفطار لأكثر من 200 صائم.",
      },
      { property: "og:title", content: "أثر — لكل تبرع أثر، ولكل أثر دليل" },
      {
        property: "og:description",
        content: "أرشيف توثيق للمشاريع الميدانية: الأرقام، الصور، والتقارير.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/athar/غزة.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const uploads = Route.useLoaderData();
  return (
    <GiveMeterProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <JourneyRail />
        <main id="main">
          <Hero />
          <VerseBand
            ayah="﴿مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ﴾"
            surah="سورة البقرة — ٢٦١"
          />
          <ImpactStats />
          <TrustSection />
          <DocumentedCampaign uploads={uploads} />
          <DonatePath />
          <DonorFaq />
          <VerseBand ayah="﴿لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ﴾" surah="سورة آل عمران — ٩٢" />
          <SadaqaSection />
          <AboutSection />
        </main>
        <Footer />
        <StickyMobileCTA />
      </div>
    </GiveMeterProvider>
  );
}
