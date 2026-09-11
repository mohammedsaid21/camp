import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { DonateChoiceProvider } from "@/components/athar/DonateChoice";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="type-kicker">أثر</p>
        <h1 className="type-display mt-3">الصفحة مش موجودة</h1>
        <p className="mt-3 type-body text-muted-foreground">
          الرابط غلط أو الصفحة انتقلت. تقدر ترجع للرئيسية وتشوف التوثيق من هناك.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="type-h1">الصفحة ما تحمّلت</h1>
        <p className="mt-2 type-body text-muted-foreground">
          صار خلل عندنا. جرب تحديث الصفحة، أو ارجع للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            حاول مرة ثانية
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold"
          >
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "أثر — لكل تبرع أثر، ولكل أثر دليل" },
      {
        name: "description",
        content: "منصة توثّق أين يذهب تبرعك وماذا يحقق، خطوة بخطوة، من الحملة إلى الأثر.",
      },
      { name: "author", content: "أثر" },
      { property: "og:title", content: "أثر — لكل تبرع أثر، ولكل أثر دليل" },
      {
        property: "og:description",
        content: "منصة توثّق أين يذهب تبرعك وماذا يحقق، خطوة بخطوة، من الحملة إلى الأثر.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/athar/غزة.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
        >
          تخطّي إلى المحتوى
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DonateChoiceProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </DonateChoiceProvider>
    </QueryClientProvider>
  );
}
