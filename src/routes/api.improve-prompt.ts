import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type Body = {
  task?: string;
  model?: string;
};

const MODEL_STYLES: Record<string, string> = {
  chatgpt:
    "ChatGPT (OpenAI GPT-5). Responds best to clear role definitions, numbered steps, explicit output format, and constraints. Supports markdown. Reward specificity and examples.",
  claude:
    "Claude (Anthropic). Prefers XML-style tags like <task>, <context>, <requirements>. Loves long context, explicit thinking steps, tone/style guidance. Excellent at nuance and long-form writing.",
  gemini:
    "Google Gemini. Prefers structured sections with headers, concise task descriptions, and explicit output schemas. Strong at multimodal reasoning and factual grounding.",
  midjourney:
    "Midjourney (image generation). Uses comma-separated visual descriptors: subject, style, medium, lighting, camera/lens, mood, color palette, aspect ratio (--ar 16:9), version (--v 6). No full sentences, no instructions.",
  perplexity:
    "Perplexity. Prefers research-oriented questions with clear scope, time range, sources preference, and desired depth. Reward citation-friendly phrasing.",
};

// -----------------------------------------------------------------------------
// Best-effort per-IP rate limit + input size cap. Documented in README.md
// under "Abuse protection". This is in-memory only — a serverless cold start
// resets it. For production traffic, front the endpoint with Cloudflare Rate
// Limiting Rules or a Turnstile challenge.
// -----------------------------------------------------------------------------
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 30;
const MAX_TASK_LENGTH = 4000;
const hits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || record.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count += 1;
  return { ok: true };
}

export const Route = createFileRoute("/api/improve-prompt")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = getClientIp(request);
        const limit = checkRateLimit(ip);
        if (!limit.ok) {
          return new Response("Rate limit exceeded. Try again later.", {
            status: 429,
            headers: { "Retry-After": String(limit.retryAfter ?? 3600) },
          });
        }

        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return new Response("Invalid JSON body", { status: 400 });
        }
        const { task, model } = body;
        if (!task || !model) {
          return new Response("Missing task or model", { status: 400 });
        }
        if (typeof task !== "string" || task.length > MAX_TASK_LENGTH) {
          return new Response(
            `Task must be a string of at most ${MAX_TASK_LENGTH} characters`,
            { status: 400 },
          );
        }
        if (typeof model !== "string" || !(model in MODEL_STYLES)) {
          return new Response("Unknown model", { status: 400 });
        }

        const style = MODEL_STYLES[model];
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const system = `You are a world-class prompt engineer. The user will give you a rough task and a target AI model. Your job:
1. Rewrite the task as a highly effective prompt tailored to the target model's strengths.
2. Give 3-5 short, sharp tips explaining WHY the rewrite works for this specific model.

Target model profile:
${style}

Return STRICT JSON only, no markdown fences, no prose. Shape:
{
  "improved": "<the full rewritten prompt, ready to paste>",
  "tips": ["tip 1", "tip 2", "tip 3"]
}

CRITICAL LANGUAGE RULE: Detect the language of the user's task text below and write BOTH "improved" and "tips" in that EXACT same language. If the task is in English, respond in English. If in Russian, respond in Russian. Never switch to a different language (no German, no French, etc. unless the task itself is in that language). Match the task's language character-for-character.`;

        try {
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            system,
            prompt: `Task: ${task}\nTarget model: ${model}`,
          });

          // Strip possible code fences
          const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
          let parsed: { improved: string; tips: string[] };
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            parsed = { improved: cleaned, tips: [] };
          }
          return Response.json(parsed);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          console.error("[api/improve-prompt] Upstream AI error:", msg, { ip, model });
          return new Response(msg, { status: 500 });
        }
      },
    },
  },
});
