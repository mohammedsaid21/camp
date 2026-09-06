import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer, Navbar, StickyMobileCTA } from "@/components/athar";

export const Route = createFileRoute("/impact")({
  component: ImpactLayout,
});

function ImpactLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
