# Agentic-First SEO

**Is your website ready for the AI agent era?** 100 AI agent personas analyze your website from the perspective of the agentic web. Get scores, verdicts, and actionable SEO recommendations.

## How It Works

1. **Submit your URL** — Enter any website URL
2. **100 AI agents analyze it** — 5 waves of 20 expert personas evaluate your site
3. **Get your Agentic SEO Report** — Scores, verdicts, recommendations, and audience fit analysis

## Personas (5 Waves)

| Wave | Category | Personas | Examples |
|------|----------|----------|----------|
| 1 | Technical Evaluators | 20 | Backend Dev, Security Researcher, DevOps, Accessibility Engineer |
| 2 | Business Stakeholders | 20 | Startup Founder, VC Partner, Growth Marketer, Product Manager |
| 3 | Target Users | 20 | Indie Hacker, Content Creator, Student, Small Business Owner |
| 4 | Industry Specialists | 20 | UX Designer, SEO Specialist, Copywriter, Data Analyst |
| 5 | Edge Cases & Critics | 20 | Compliance Officer, Privacy Advocate, Senior Citizen, Competitor |

## Scoring

Each persona evaluates across 10 categories (1-10 scale):
- First Impression, Value Proposition, Trust & Credibility
- User Experience, Content Quality, Visual Design
- Performance, Mobile Experience, Accessibility, Call-to-Action Clarity

Verdicts: **Yes** (would use) | **Maybe** (interested but blockers) | **No** (would not use)

## Pricing

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 20 personas (Wave 1), 3 reviews/day |
| **Pro** | $9.99/mo | 100 personas (all waves), unlimited reviews, shareable reports |

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **AI:** Anthropic Claude (Sonnet 4.5)
- **Storage:** Upstash Redis (24h TTL)
- **Payments:** Stripe
- **Deployment:** Vercel

## Local Development

```bash
git clone https://github.com/ConejoCapital/Agentic-First-SEO.git
cd Agentic-First-SEO
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API key for AI reviews |
| `KV_REST_API_URL` | No | Upstash Redis URL for saving results |
| `KV_REST_API_TOKEN` | No | Upstash Redis token |
| `STRIPE_SECRET_KEY` | No | Stripe secret key for subscriptions |
| `STRIPE_PRICE_ID` | No | Stripe price ID for Pro plan |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key |

## License

MIT

## Built By

[ConejoCapital](https://github.com/ConejoCapital) — SEO for the Agentic Web
