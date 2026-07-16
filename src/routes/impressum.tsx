import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({ meta: [{ title: "Impressum — Synthecs Academy" }] }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-foreground">
      <a href="/" className="text-sm text-primary hover:underline">
        ← Back to Synthecs Academy
      </a>
      <h1 className="mt-8 text-4xl font-bold">Impressum</h1>
      <section className="prose prose-invert mt-10 max-w-none">
        <p>
          <strong>IMPORTANT:</strong> Complete the following fields with the operator’s real legal
          details before publishing in Germany or the EU.
        </p>
        <h2>Provider</h2>
        <p>
          [LEGAL NAME]
          <br />
          [STREET AND HOUSE NUMBER]
          <br />
          [POSTCODE AND CITY]
          <br />
          [COUNTRY]
        </p>
        <h2>Contact</h2>
        <p>Email: [CONTACT EMAIL]</p>
      </section>
    </main>
  );
}
