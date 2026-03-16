# Agentic-First SEO — AI Agent Context Document

## Project Overview

**Agentic-First SEO** is a Next.js 14 web app that sends waves of AI agent personas to review websites from an SEO-for-the-AI-agent-era perspective. Users submit a URL, and up to 100 AI personas across 5 waves analyze the site, producing scores, verdicts, recommendations, and audience fit data.

- **Stack:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Claude API, Upstash Redis
- **Payments:** Stripe (subscriptions) — Free tier (1 wave/20 personas, 3/day), Pro tier ($9.99/mo, 5 waves/100 personas)
- **Design:** Dark theme with `#0a0a0a` background, `#00E5A0` accent, Instrument Serif + DM Sans fonts

## Architecture

```
app/
├── page.tsx                     # Home: Hero, HowItWorks, WhyAgentic, SocialProof, Pricing
├── layout.tsx                   # Root layout with fonts, metadata, JSON-LD
├── review/[id]/page.tsx         # Dynamic review results page (client-driven waves)
├── api/
│   ├── review/
│   │   ├── route.ts             # POST — scrape URL, return reviewId + content
│   │   ├── wave/route.ts        # POST — run one wave of personas via Claude API
│   │   └── [id]/route.ts        # GET/PUT — fetch/save review results (Redis)
│   ├── stripe/
│   │   ├── checkout/route.ts    # POST — create Stripe checkout session
│   │   └── webhook/route.ts     # POST — handle Stripe webhook events
│   └── og/route.tsx             # GET — dynamic OG image
├── robots.ts                    # robots.txt
├── sitemap.ts                   # sitemap.xml
├── error.tsx                    # Error boundary
├── not-found.tsx                # 404 page
└── loading.tsx                  # Global loading skeleton

components/
├── header.tsx                   # Sticky nav with dark theme
├── footer.tsx                   # Footer with tagline
├── hero-section.tsx             # URL input, persona rotation, CTA
├── how-it-works.tsx             # 3-step explanation
├── why-agentic.tsx              # Problem/solution section
├── social-proof.tsx             # Trust signals
├── pricing-section.tsx          # Free vs Pro plans
├── review-progress.tsx          # Wave progress indicator
├── aggregate-summary.tsx        # Score ring + verdict bars
├── category-scores.tsx          # Bar chart of 10 categories
├── persona-card.tsx             # Expandable individual review
├── recommendations.tsx          # Top concerns ranked
├── audience-fit.tsx             # Audience segment table
├── verdict-chart.tsx            # Yes/Maybe/No chart
├── copy-report.tsx              # Copy/download report
└── json-ld.tsx                  # Structured data

lib/
├── stripe.ts                    # Stripe helpers (checkout, webhooks)
├── rate-limiter.ts              # In-memory rate limiting (3/day free)
├── scraper.ts                   # URL scraper with cheerio
├── review-engine.ts             # Claude API wave orchestration
├── report-generator.ts          # Markdown report generation
├── scoring.ts                   # Aggregate computation
├── prompts.ts                   # System/user prompts for personas
├── types.ts                     # TypeScript interfaces
├── utils.ts                     # cn() helper
├── env.ts                       # Zod env validation
└── personas/                    # 100 persona definitions (5 waves × 20)
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key for AI reviews |
| `KV_REST_API_URL` | No | Upstash Redis URL (for saving/sharing) |
| `KV_REST_API_TOKEN` | No | Upstash Redis token |
| `STRIPE_SECRET_KEY` | No | Stripe secret key (for Pro tier) |
| `STRIPE_PRICE_ID` | No | Stripe price ID for Pro subscription |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key (client-side) |

## Skills Reference

This project uses skills from `~/Desktop/Agentic Skills/`:
- `frontend-design` — Distinctive UI, anti-AI-slop aesthetic
- `react-best-practices` — Performance patterns from Vercel Engineering
- `web-design-guidelines` — Accessibility, WCAG compliance
- `nextjs-vercel` — Deployment patterns, dark theme system
- `composition-patterns` — React composition patterns
- `theme-factory` — Color palettes and font pairings

## Key Patterns

- **Client-driven waves:** Review page orchestrates waves sequentially via fetch calls to `/api/review/wave`
- **Session storage:** Scraped content stored in `sessionStorage` to avoid re-scraping on page navigation
- **Tier gating:** Free users get 1 wave (20 personas), Pro gets 5 waves (100 personas)
- **Rate limiting:** In-memory map, 3 reviews/day for free tier (per IP)

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint check
npm run start   # Start production server
```

## Current Status

- Rebranded from "Agentic First Review" to "Agentic-First SEO"
- Dark theme with electric green accent (#00E5A0)
- Stripe re-integrated with Free/Pro tiers
- Full SEO: OG tags, JSON-LD, sitemap, robots.txt
