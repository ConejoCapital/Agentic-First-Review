import Anthropic from "@anthropic-ai/sdk";
import type { PersonaReview, CategoryScore } from "./types";
import { SCORE_CATEGORIES } from "./types";
import type { PersonaDefinition } from "./prompts";
import { buildSystemPrompt, buildUserPrompt } from "./prompts";

function parseReviewResponse(
  raw: string
): Omit<PersonaReview, "personaId" | "personaName" | "personaBackground" | "waveNumber" | "audienceSegment"> | null {
  try {
    // Try to extract JSON from the response
    let jsonStr = raw.trim();

    // Remove markdown code blocks if present
    const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);

    // Validate and normalize category scores
    const categoryScores: CategoryScore[] = SCORE_CATEGORIES.map((cat) => {
      const found = parsed.categoryScores?.find(
        (cs: { category: string; score: number; comment: string }) =>
          cs.category === cat
      );
      return {
        category: cat,
        score: Math.min(10, Math.max(1, Number(found?.score) || 5)),
        comment: found?.comment || "",
      };
    });

    const overallScore = Math.min(
      10,
      Math.max(1, Number(parsed.overallScore) || 5)
    );

    const verdict = ["yes", "maybe", "no"].includes(parsed.verdict?.toLowerCase())
      ? (parsed.verdict.toLowerCase() as "yes" | "maybe" | "no")
      : "maybe";

    return {
      firstImpression: String(parsed.firstImpression || ""),
      positives: Array.isArray(parsed.positives)
        ? parsed.positives.map(String).slice(0, 5)
        : [],
      concerns: Array.isArray(parsed.concerns)
        ? parsed.concerns.map(String).slice(0, 5)
        : [],
      categoryScores,
      overallScore,
      verdict,
      verdictExplanation: String(parsed.verdictExplanation || ""),
      topConcern: String(parsed.topConcern || ""),
      topPraise: String(parsed.topPraise || ""),
      recommendation: String(parsed.recommendation || ""),
    };
  } catch {
    return null;
  }
}

export async function runWave(
  waveNumber: number,
  personas: PersonaDefinition[],
  websiteContent: string,
  apiKey: string
): Promise<PersonaReview[]> {
  const client = new Anthropic({ apiKey });

  const results = await Promise.allSettled(
    personas.map(async (persona) => {
      const message = await client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1500,
        system: buildSystemPrompt(persona),
        messages: [{ role: "user", content: buildUserPrompt(websiteContent) }],
      });

      const text =
        message.content[0].type === "text" ? message.content[0].text : "";
      const parsed = parseReviewResponse(text);

      if (!parsed) {
        throw new Error(`Failed to parse response for ${persona.name}`);
      }

      const review: PersonaReview = {
        personaId: persona.id,
        personaName: persona.name,
        personaBackground: persona.background,
        waveNumber,
        audienceSegment: persona.audienceSegment,
        ...parsed,
      };

      return review;
    })
  );

  const reviews: PersonaReview[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      reviews.push(result.value);
    }
  }

  return reviews;
}
