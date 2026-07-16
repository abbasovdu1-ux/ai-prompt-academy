import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Use — Synthecs" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-foreground">
      <a href="/" className="text-sm text-primary hover:underline">
        ← Back to Synthecs
      </a>
      <h1 className="mt-8 text-4xl font-bold">Terms of Use</h1>
      <p className="mt-3 text-muted-foreground">Last updated: 16 July 2026</p>
      <section className="prose prose-invert mt-10 max-w-none">
        <h2>Educational service</h2>
        <p>
          Synthecs provides educational material and AI-assisted prompt suggestions. AI output may
          be incomplete or inaccurate and should be reviewed before use.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not use the service to submit unlawful content, attack the service, bypass rate limits,
          or infringe another person’s rights.
        </p>
        <h2>Availability</h2>
        <p>
          The service is provided on an availability basis and may change as models and providers
          change.
        </p>
        <h2>Operator details</h2>
        <p>
          Replace this section with the operator’s legal details and governing-law information
          before launch.
        </p>
      </section>
    </main>
  );
}
