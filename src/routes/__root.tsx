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
import { I18nProvider, useI18n } from "../lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => undefined, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { title: "Synthecs Academy — Master AI & Prompt Engineering" },
      {
        name: "description",
        content:
          "Learn to control AI with surgical precision. Deep-dive courses on prompt engineering, LLMs, generative art, and agent architectures.",
      },
      { property: "og:title", content: "Synthecs Academy — Master AI & Prompt Engineering" },
      {
        property: "og:description",
        content:
          "Deep-dive tracks curated by leading AI researchers. Learn prompt engineering, LLMs, and agent design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
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
      <I18nProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <GlobalFooter />
      </I18nProvider>
    </QueryClientProvider>
  );
}

function GlobalFooter() {
  const { t } = useI18n();
  return (
    <footer className="global-footer border-t border-border px-6 py-12 text-center text-sm text-muted-foreground">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <Link to="/privacy" className="hover:text-foreground">{t("privacy")}</Link>
        <Link to="/impressum" className="hover:text-foreground">{t("impressum")}</Link>
        <Link to="/terms" className="hover:text-foreground">{t("terms")}</Link>
      </nav>
      <div className="mx-auto mt-8 max-w-md border-t border-border/70 pt-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">{t("contact")}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
          <a href="mailto:toghrulabbasov7@gmail.com" className="hover:text-foreground">toghrulabbasov7@gmail.com</a>
          <a href="https://www.linkedin.com/in/toghrul-abbasov-10a24534a/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4.96v15H.5V8Zm7.5 0h4.75v2.05h.07c.66-1.25 2.28-2.55 4.7-2.55 5.03 0 5.96 3.31 5.96 7.61V23h-4.95v-7.01c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.7 1.82-2.7 3.7V23H8V8Z" /></svg>
            {t("linkedin")}
          </a>
        </div>
        <p className="mt-3 text-xs text-muted-foreground/70">Toghrul Abbasov · CEO &amp; Founder</p>
      </div>
      <p className="mt-3 text-xs">Toghrul Abbasov · <a href="https://www.linkedin.com/in/toghrul-abbasov-10a24534a/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">{t("linkedin")}</a></p>
    </footer>
  );
}
