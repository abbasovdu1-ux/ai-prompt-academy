import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Synthecs Academy" },
      { name: "description", content: "How Synthecs Academy processes personal data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-foreground">
      <a href="/" className="text-sm text-primary hover:underline">
        ← Back to Synthecs Academy
      </a>
      <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">Last updated: 16 July 2026</p>

      <section className="prose prose-invert mt-10 max-w-none">
        <h2>1. Controller</h2>
        <p>
          <strong>IMPORTANT:</strong> Before launch, replace this section with the legal name,
          postal address and contact email of the person or company operating Synthecs Academy.
        </p>
        <p>Controller: [LEGAL NAME], [POSTAL ADDRESS], [CONTACT EMAIL].</p>

        <h2>2. What we process</h2>
        <p>
          The public learning pages do not require an account and the application does not
          intentionally store lesson progress or prompt text in a database.
        </p>
        <p>
          When you use the prompt trainer, the task text and selected target model are sent to
          Google Gemini through the server. We do not send the Gemini API key to your browser.
        </p>

        <h2>3. Legal basis and retention</h2>
        <p>
          The service request is processed to provide the requested feature. Requests may be
          processed in provider and hosting logs for security, reliability and abuse prevention.
          Configure retention periods with the hosting and AI providers before launch.
        </p>

        <h2>4. Service providers</h2>
        <p>
          The application may use Vercel for hosting, Google Gemini for prompt rewriting, and Google
          Fonts for typography. Review each provider’s data-processing terms and international
          transfer safeguards before launch.
        </p>

        <h2>5. Your rights</h2>
        <p>
          Subject to the GDPR, you may have rights of access, correction, deletion, restriction,
          portability and objection. Contact the controller above. You may also complain to your
          competent data-protection authority.
        </p>

        <h2>6. Changes</h2>
        <p>We may update this policy when the service or its providers change.</p>
      </section>
    </main>
  );
}
