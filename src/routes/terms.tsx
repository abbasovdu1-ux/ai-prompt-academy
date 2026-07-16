import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use — Synthecs Academy" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="legal-shell mx-auto min-h-screen px-6 py-20 text-foreground">
      <a href="/" className="text-sm text-primary hover:underline">← Back to Synthecs Academy</a>
      <h1 className="mt-10 text-4xl font-semibold tracking-tight">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 16 July 2026</p>
      <section className="legal-content mt-12 max-w-none">
        <h2>Educational service</h2>
        <p>Synthecs Academy provides educational material and AI-assisted prompt suggestions. AI output may be incomplete or inaccurate and should be reviewed before use.</p>
        <h2>Acceptable use</h2>
        <p>Do not use the service to submit unlawful content, attack the service, bypass rate limits, or infringe another person’s rights.</p>
        <h2>Availability</h2>
        <p>The service is provided on an availability basis and may change as models and providers change.</p>
        <h2>Operator details</h2>
        <p>The service is operated by Toghrul Abbasov, Siemensstraße 6, 12459 Berlin, Bezirk Treptow-Köpenick, Deutschland.</p>
      </section>
    </main>
  );
}
