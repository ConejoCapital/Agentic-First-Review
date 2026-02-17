# Agentic First Review

**Get your website reviewed by 100 AI expert personas.** Paste any URL and receive actionable feedback from developers, marketers, designers, investors, and more.

## How It Works

1. **Paste your URL** - Website or GitHub repository
2. **100 AI agents review it** - In 5 waves of 20 expert personas each
3. **Get an actionable report** - Scores, verdicts, recommendations, and audience fit analysis

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
- Documentation, Visual Design, UX & Navigation
- Technical Depth, Social Proof, Mobile Experience, Conversion Potential

Verdicts: **Yes** (would use) | **Maybe** (interested but blockers) | **No** (would not use)

## Pricing

| Tier | Price | Includes |
|------|-------|----------|
| **Free** | $0 | 20 personas (Wave 1), 1 review/day |
| **Pro** | $9.99/mo | 100 personas (all waves), unlimited reviews, BYOK |

Pro users bring their own Anthropic API key for unlimited reviews.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **AI:** Anthropic Claude (Sonnet 4.5)
- **Storage:** Upstash Redis (24h TTL)
- **Payments:** Stripe
- **Deployment:** Vercel

## Local Development

```bash
git clone https://github.com/ConejoCapital/Agentic-First-Review.git
cd Agentic-First-Review
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Platform API key for free tier |
| `KV_REST_API_URL` | No | Upstash Redis URL for saving results |
| `KV_REST_API_TOKEN` | No | Upstash Redis token |
| `STRIPE_SECRET_KEY` | No | Stripe secret key for subscriptions |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook verification |
| `STRIPE_PRICE_ID` | No | Stripe price ID for $9.99/mo plan |

## API

### POST /api/review
Initialize a review by scraping a URL.
```json
{ "url": "https://example.com" }
```

### POST /api/review/wave
Run one wave of 20 persona reviews.
```json
{ "reviewId": "abc123", "waveNumber": 1, "content": { ... }, "apiKey": "sk-ant-..." }
```

### GET /api/review/[id]
Fetch saved review results.

## License

MIT

## Built By

[ConejoCapital](https://github.com/ConejoCapital)
