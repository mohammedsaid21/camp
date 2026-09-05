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
  HADITH_UMMAH,
} from "@/components/athar";

export const Route = createFileRoute("/")({
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GiveMeterProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <VerseBand
            ayah="﴿مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ﴾"
            surah="سورة البقرة — ٢٦١"
          />
          <ImpactStats />
          <DonatePath />
          {/* <VerseBand ayah={HADITH_UMMAH.text} surah={HADITH_UMMAH.source} tone="leaf" /> */}
          {/* <TrustSection /> */}
          <DocumentedCampaign />
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
