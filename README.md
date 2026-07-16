# Synthecs — Learn AI & Prompt Engineering

An interactive learning site for everyday AI users. Three paths:

- **Learn** (`/learn`) — 6 interactive lessons with instant AI feedback on your prompts.
- **Library** (`/library`) — 12 ready-to-use prompts for work and life.
- **Methods** (`/methods`) — 18 prompt engineering frameworks (RTF, RCTCO, Chain-of-Thought, ReAct, Tree-of-Thoughts, Reflexion, …).
- **Trainer** (`/trainer`) — paste any task + pick a model, get a rewritten production-grade prompt.

Built on TanStack Start (React 19 + Vite 7). AI features run through the Lovable AI Gateway.

---

## Tech stack

| Layer            | Choice                                                     |
| ---------------- | ---------------------------------------------------------- |
| Framework        | [TanStack Start v1](https://tanstack.com/start) (React 19) |
| Bundler          | Vite 7                                                     |
| Styling          | Tailwind CSS v4 (via `@tailwindcss/vite`)                  |
| UI primitives    | Radix UI + shadcn-style wrappers in `src/components/ui`    |
| Animation        | `motion` (Framer Motion successor)                         |
| Routing          | File-based, `src/routes/*` (auto-generated route tree)     |
| Data fetching    | TanStack Query                                             |
| Forms            | react-hook-form + zod                                      |
| AI SDK           | Vercel `ai` + `@ai-sdk/openai-compatible`                  |
| AI provider      | Lovable AI Gateway (`https://ai.gateway.lovable.dev/v1`)   |
| Server runtime   | Cloudflare Workers (nodejs_compat) — set by hosting        |
| Package manager  | `bun` (works with `npm`/`pnpm` too)                        |
| Language / types | TypeScript strict mode                                     |

**No database, no auth, no file storage, no payments.** All content is static in the codebase. The only server call is `POST /api/improve-prompt` which streams a rewritten prompt from an AI model.

---

## Local setup

Prerequisites: Node.js ≥ 20 and [Bun](https://bun.sh) (recommended).

```bash
# 1. Install dependencies
bun install

# 2. Configure environment
cp .env.example .env
# then open .env and set LOVABLE_API_KEY

# 3. Start the dev server (http://localhost:8080)
bun run dev
```

Scripts:

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `bun run dev`       | Start Vite dev server on `:8080`                 |
| `bun run build`     | Production build (SSR + client bundles)          |
| `bun run build:dev` | Development-mode build (includes source maps)    |
| `bun run preview`   | Serve the production build locally               |
| `bun run lint`      | ESLint over the repo                             |
| `bun run format`    | Prettier                                         |

---

## Environment variables

| Variable          | Required | Where it's read                                                              | Purpose                                          |
| ----------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------ |
| `LOVABLE_API_KEY` | Yes      | `src/lib/ai-gateway.server.ts`, `src/routes/api.improve-prompt.ts` (server)  | Auth for the AI Gateway. Server-only. **Never** expose. |
| `NODE_ENV`        | No       | Hosting runtime                                                              | `production` in prod builds. Vite sets it locally. |

Rules:

- Anything the browser must read has to start with `VITE_` and be read via `import.meta.env`. This project has no such variables.
- Server code reads secrets via `process.env.*` inside handler bodies — never at module top level.
- If you swap the AI provider, delete `LOVABLE_API_KEY` from `.env.example` and add your provider's key (e.g. `OPENAI_API_KEY`) along with a matching change in `src/lib/ai-gateway.server.ts`.

---

## Backend architecture

There is no traditional backend. The app is fully SSR/edge with two kinds of server surfaces provided by TanStack Start:

### 1. Server route (streaming HTTP endpoint)

`src/routes/api.improve-prompt.ts`

- Method: `POST /api/improve-prompt`
- Body: `{ task: string, model: "gemini" | "gpt" | "claude" | ... }`
- Response: Server-Sent Events / streaming text — the rewritten prompt.
- Calls Lovable AI Gateway (`google/gemini-3-flash-preview` by default) via `streamText` from the `ai` SDK.
- System prompt forces the answer to be returned in the same language the user typed in.

### 2. AI Gateway helper

`src/lib/ai-gateway.server.ts` — creates an OpenAI-compatible provider pointing at `https://ai.gateway.lovable.dev/v1` and sending `Lovable-API-Key: $LOVABLE_API_KEY`. Never import this from client code — the `.server.ts` suffix bans it from the browser bundle at build time.

### Database schema

None. Nothing is persisted server-side.

### Authentication

None. All routes are public. No login, no sessions, no cookies set by the app.

### Storage

None. No user uploads, no CDN buckets. Icons and fonts are either inline SVG (`src/components/Logo.tsx`), served from `public/`, or loaded from Google Fonts via a `<link>` in `src/routes/__root.tsx`.

### API routes / integrations

| Route                    | Type          | Auth      | Third-party call                                     |
| ------------------------ | ------------- | --------- | ---------------------------------------------------- |
| `POST /api/improve-prompt` | Server route  | Public    | Lovable AI Gateway → Google Gemini (default model)   |

---

## Third-party services

| Category            | Service                                                        | Used for                                            |
| ------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| Hosting             | Lovable (Cloudflare Workers)                                   | Preview + production deployments                    |
| Database            | *None*                                                         | —                                                   |
| Auth                | *None*                                                         | —                                                   |
| File storage        | *None*                                                         | —                                                   |
| AI                  | Lovable AI Gateway → Google Gemini (`google/gemini-3-flash-preview`) | Prompt rewriting in `/trainer`               |
| Fonts               | Google Fonts (Bricolage Grotesque, JetBrains Mono)             | Typography                                          |
| Analytics           | *None*                                                         | Add Plausible / PostHog if needed                   |
| Email               | *None*                                                         | —                                                   |
| Payments            | *None*                                                         | —                                                   |
| Cookies             | *None set by app*                                              | The site does not set cookies. Only Google Fonts may set them at the font provider's edge — cover this in a privacy notice if you add analytics. |

---

## Security review

Assessment against the checklist:

| Concern                              | Status                                                                                                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exposed API keys                     | `LOVABLE_API_KEY` is read only from `process.env` inside `.server.ts` and route handlers. Not prefixed with `VITE_`. Verified no `VITE_*` secrets in code. |
| Insecure database policies           | N/A — no database.                                                                                                                                         |
| Missing authentication               | Intentional — this is a public marketing/learning site. `/api/improve-prompt` is deliberately public.                                                      |
| Public data access                   | No user data exists to expose.                                                                                                                             |
| Rate limiting / abuse protection     | See `src/routes/api.improve-prompt.ts` — basic per-IP throttle (see "Abuse protection" below).                                                             |
| Error logging                        | `src/lib/lovable-error-reporting.ts` + `src/lib/error-capture.ts` already wired.                                                                           |

**Because `/api/improve-prompt` is unauthenticated, every request costs credits on the Lovable AI Gateway.** Monitor spend in the Lovable dashboard and rotate `LOVABLE_API_KEY` (`Project Settings → Secrets`) if the site is abused.

### Abuse protection

The endpoint applies a simple in-memory per-IP rate limit (30 requests / hour). This is best-effort — a serverless runtime may reset counters between cold starts, and it does not defend against distributed abuse. For production traffic, put Cloudflare WAF / Rate Limiting Rules in front of the endpoint or add a Turnstile challenge before calling it.

---

## Database migrations & seed data

Not applicable — no database. All lesson content, prompts and framework definitions are hard-coded data structures in:

- `src/routes/learn.tsx` (`lessons` array)
- `src/routes/library.tsx` (`prompts` array)
- `src/routes/methods.tsx` (`methods` array)
- `src/routes/index.tsx` (`modules` array)

To add content, edit those arrays and redeploy. If you later add persistence, put migrations in `supabase/migrations/` and seed rows in the same migration file.

---

## Production deployment

### Option A — Deploy on Lovable (default)

1. Open the project in Lovable.
2. Click **Publish** (top-right).
3. Optionally connect a custom domain in **Project Settings → Domains**.
4. Frontend edits go live only after clicking **Update** in the publish dialog. Server function edits deploy immediately.

### Option B — Self-host on Cloudflare Workers / any Node host

TanStack Start builds a standard Nitro/Vite output. To self-host:

1. `bun run build` — produces `.output/` (server) and `dist/` (client) directories.
2. Set `LOVABLE_API_KEY` in the host's secret manager (Cloudflare → Workers → Variables, Vercel → Project Settings → Environment Variables, etc.).
3. Deploy the built output per the host's docs (`wrangler deploy`, `vercel deploy`, `flyctl deploy`, …).
4. Point DNS at the host.

### Pre-launch checklist

- [ ] `LOVABLE_API_KEY` set in production environment.
- [ ] `.env` is git-ignored (verify `.gitignore` contains `.env`).
- [ ] `bun run build` completes with no TypeScript errors.
- [ ] `/api/improve-prompt` returns 200 with a valid `task` + `model`.
- [ ] Open `/`, `/learn`, `/library`, `/methods`, `/trainer` — all render, no console errors.
- [ ] SEO meta present per route (each route's `head()` sets a unique `title` + `description`).
- [ ] `og:image` set on leaf routes only if you have a real cover image; otherwise omit (hosting injects a screenshot).
- [ ] Google Fonts `<link>` in `src/routes/__root.tsx` loads over HTTPS.
- [ ] Cloudflare Rate Limiting / Turnstile enabled in front of `/api/improve-prompt` if the site is public.
- [ ] Custom domain connected + SSL green.
- [ ] Monitor AI Gateway credit balance in the Lovable dashboard for the first week.
- [ ] Add an analytics tool (Plausible / PostHog) if you need traffic data.

---

## User data — export, delete, backup

There is no user data:

- No accounts, no profiles.
- Nothing written to `localStorage` besides transient UI preferences (none currently).
- No cookies set by application code.

If you later add user accounts:

- **Export** — provide a `/settings/export` route that returns all rows keyed by the current user's `auth.uid()` as JSON.
- **Delete** — provide a `/settings/delete-account` server function that deletes user rows across every table and calls `supabase.auth.admin.deleteUser(userId)` (needs service role).
- **Backup** — enable daily automated backups in the database provider dashboard. For Supabase: Project Settings → Database → Backups.

---

## Error logging

Already wired:

- `src/lib/error-capture.ts` — captures uncaught errors + unhandled promise rejections in the browser.
- `src/lib/lovable-error-reporting.ts` — forwards them to the Lovable error reporting endpoint during development, and no-ops in production. Swap for Sentry / your provider before launch if you want production-grade tracing.

---

## Repo layout

```
src/
├─ routes/
│  ├─ __root.tsx              # HTML shell, <head>, fonts
│  ├─ index.tsx               # Home
│  ├─ learn.tsx               # Interactive lessons
│  ├─ library.tsx             # Prompt library
│  ├─ methods.tsx             # 18 prompt frameworks
│  ├─ trainer.tsx             # Prompt rewriter UI
│  ├─ animations.tsx          # Internal design playground
│  └─ api.improve-prompt.ts   # Server route → AI Gateway
├─ components/
│  ├─ Logo.tsx                # SVG brand mark
│  └─ ui/                     # shadcn-style Radix wrappers
├─ lib/
│  ├─ ai-gateway.server.ts    # OpenAI-compatible provider → Lovable AI
│  ├─ error-capture.ts
│  ├─ lovable-error-reporting.ts
│  ├─ error-page.ts
│  └─ utils.ts
├─ styles.css                 # Tailwind v4 tokens (--brand, --brand-light, …)
├─ router.tsx                 # Router + QueryClient wiring
├─ routeTree.gen.ts           # AUTO-GENERATED — never edit
└─ start.ts                   # Server middleware
public/                        # Static assets (favicon, etc.)
```

---

## Handoff to Codex / another agent

1. Push this repo to GitHub (see next section).
2. Point Codex at the repo URL.
3. Tell it: "The full architecture and env vars are in `README.md`. Copy `.env.example` to `.env` and set `LOVABLE_API_KEY` before running `bun run dev`."

---

## Sending the code to GitHub

Lovable's GitHub integration is a manual UI step — an agent cannot do it for you.

**From the Lovable editor:**

1. Open the Plus (**+**) menu in the chat input (bottom-left).
2. Click **GitHub → Connect project**.
3. Authorize the Lovable GitHub App on the account/org you want.
4. Click **Create Repository**. Lovable will push the current codebase and keep it in two-way sync.

After that the repo exists at `https://github.com/<your-org>/<repo-name>` and you can clone it, share the URL with Codex, or self-host it.

**Alternative — download a ZIP:**

Open the code editor inside Lovable → **Download codebase** (bottom of the file tree). Requires a paid workspace.
