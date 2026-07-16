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
        <h2>Anbieter</h2>
        <p>
          Toghrul Abbasov
          <br />
          Siemensstraße 6
          <br />
          12459 Berlin
          <br />
          Bezirk Treptow-Köpenick
          <br />
          Deutschland
          <br />
          CEO &amp; Founder, Synthecs Academy
        </p>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <a href="mailto:toghrulabbasov7@gmail.com">toghrulabbasov7@gmail.com</a>
        </p>
        <p>
          LinkedIn: <a href="https://www.linkedin.com/in/toghrul-abbasov-10a24534a/" target="_blank" rel="noreferrer">linkedin.com/in/toghrul-abbasov-10a24534a</a>
        </p>
      </section>
    </main>
  );
}
