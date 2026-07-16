# Synthecs Academy — Learn AI & Prompt Engineering

Synthecs Academy is an interactive learning site for prompt engineering. It includes lessons, a prompt library, reusable methods and an AI prompt trainer.

## Stack

- React 19, TanStack Start, TanStack Router and Vite
- Tailwind CSS v4, Radix UI and Motion
- Google Gemini API through the official Vercel AI SDK provider
- Vercel deployment with server-side API key storage

There is currently no database, authentication, payment system or user account. Learning content is static in the source code. The only server endpoint is `POST /api/improve-prompt`.

## Local development

Requirements: Node.js 20+ and Bun.

```bash
bun install
Copy-Item .env.example .env
# Add GEMINI_API_KEY to .env
bun run dev
```

Useful commands:

```bash
bun run build
bun run lint
```

## Environment variables

| Variable         | Required | Purpose                                                            |
| ---------------- | -------- | ------------------------------------------------------------------ |
| `GEMINI_API_KEY` | Yes      | Server-only Google Gemini API key. Never expose it in client code. |
| `GEMINI_MODEL`   | No       | Model override. Defaults to `gemini-2.5-flash`.                    |

Create and restrict the key in Google AI Studio. Add it to Vercel under Project Settings → Environment Variables for Production, Preview and Development as needed.

## API protection

The prompt trainer validates the model and input length, limits requests to 30 per IP per hour, and never returns upstream provider errors to the browser. The in-memory limit is only a first layer; for a public launch, add Vercel Firewall/edge rate limiting or a CAPTCHA/Turnstile challenge and monitor Gemini usage.

## Privacy and legal pages

The project contains `/privacy`, `/impressum` and `/terms` routes. Replace the bracketed operator details in the legal pages before launch. The privacy notice must match the actual hosting, AI, fonts, analytics and cookie configuration. This is a technical draft and should be reviewed for the applicable jurisdiction.

The app currently loads Google Fonts from Google’s CDN. Either document that transfer in the privacy notice or self-host the fonts before launch.

## Deployment on Vercel

1. Import the GitHub repository into Vercel.
2. Keep the framework preset compatible with Vite/TanStack Start and use Bun or `bun install` if available.
3. Add `GEMINI_API_KEY` as a secret environment variable. Do not commit `.env`.
4. Deploy and test `/`, `/learn`, `/library`, `/methods`, `/trainer` and `POST /api/improve-prompt`.
5. Connect a custom domain only after the legal details and AI key are configured.
