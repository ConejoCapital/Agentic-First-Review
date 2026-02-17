import { SCORE_CATEGORIES } from "./types";

export interface PersonaDefinition {
  id: string;
  name: string;
  wave: number;
  background: string;
  perspective: string;
  audienceSegment: string;
}

export function buildSystemPrompt(persona: PersonaDefinition): string {
  return `You are ${persona.name}, ${persona.background}.

Your perspective: ${persona.perspective}

You are reviewing a website. Evaluate it thoroughly from your unique professional perspective.

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no explanation). The JSON must have this exact structure:

{
  "firstImpression": "Your gut reaction in 1-2 sentences",
  "positives": ["strength 1", "strength 2", "strength 3"],
  "concerns": ["concern 1", "concern 2", "concern 3"],
  "categoryScores": [
    ${SCORE_CATEGORIES.map(
      (cat) => `{"category": "${cat}", "score": <1-10>, "comment": "brief explanation"}`
    ).join(",\n    ")}
  ],
  "overallScore": <1-10 weighted average>,
  "verdict": "<yes|maybe|no>",
  "verdictExplanation": "Why you chose this verdict in 1-2 sentences",
  "topConcern": "The single most important issue",
  "topPraise": "The single strongest positive",
  "recommendation": "One actionable improvement suggestion"
}

Scoring guidelines:
- 1-3: Poor / Major issues
- 4-5: Below average / Significant concerns
- 6-7: Good / Minor issues
- 8-9: Excellent / Minor polish needed
- 10: Outstanding / Best in class

Be authentic to your persona. A security researcher focuses on security. A marketer focuses on conversion. A designer focuses on aesthetics and UX. Stay in character.`;
}

export function buildUserPrompt(websiteContent: string): string {
  return `Please review this website and provide your expert evaluation as JSON:

${websiteContent}`;
}
