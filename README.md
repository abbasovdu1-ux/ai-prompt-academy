# Synthecs Academy — Learn AI & Prompt Engineering

An interactive web application that helps users improve their AI prompting skills through hands-on practice, structured lessons, and AI-powered feedback.

**[Live Demo](https://synthecs-academy.vercel.app)** · **[GitHub Repository](https://github.com/abbasovdu1-ux/ai-prompt-academy)**

## Features

- **Interactive Learning:** 6 lessons with practical exercises and AI feedback.
- **Prompt Library:** 12 ready-to-use prompts for everyday and professional tasks.
- **Prompt Engineering Methods:** 18 frameworks and techniques.
- **AI Prompt Trainer:** Improve user prompts with AI-powered rewriting and streaming responses.
- **Multilingual Interface:** English and German support.

## Tech Stack

- **Frontend:** React 19, TanStack Start, TypeScript, Tailwind CSS
- **UI:** Radix UI, Motion
- **AI Integration:** Vercel AI SDK, Lovable AI Gateway, Google Gemini
- **Runtime:** Cloudflare Workers
- **Tooling:** Vite 7, Bun, ESLint, Prettier

## Architecture

Synthecs Academy uses TanStack Start with server-side rendering and a lightweight server API.

The AI Prompt Trainer sends requests to `POST /api/improve-prompt`, which communicates with the AI provider through a server-side gateway and streams the generated response back to the user.

API credentials remain server-side. The endpoint also includes basic request throttling.

## Getting Started

```bash
git clone https://github.com/abbasovdu1-ux/ai-prompt-academy.git
cd ai-prompt-academy
bun install
cp .env.example .env
```

Add your `LOVABLE_API_KEY` to `.env`, then run:

```bash
bun run dev
```

## Future Improvements

- Persistent learning progress and user accounts
- More interactive prompt exercises
- Automated testing and improved API monitoring
- Additional AI model integrations

## Project Goal

The goal of Synthecs Academy is to make AI literacy and prompt engineering more accessible through practical learning rather than theory alone.
