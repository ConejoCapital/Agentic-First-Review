import { NextRequest, NextResponse } from "next/server";
import { runWave } from "@/lib/review-engine";
import { getWavePersonas } from "@/lib/personas";
import type { WaveResponse } from "@/lib/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { reviewId, waveNumber, content, apiKey } = await request.json();

    if (!reviewId || !waveNumber || !content) {
      return NextResponse.json(
        { error: "Missing required fields: reviewId, waveNumber, content" },
        { status: 400 }
      );
    }

    if (waveNumber < 1 || waveNumber > 5) {
      return NextResponse.json(
        { error: "Wave number must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Use provided key or fall back to server key
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "No API key available. Set ANTHROPIC_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const personas = getWavePersonas(waveNumber);
    if (personas.length === 0) {
      return NextResponse.json(
        { error: `No personas found for wave ${waveNumber}` },
        { status: 400 }
      );
    }

    const reviews = await runWave(waveNumber, personas, content, key);

    const response: WaveResponse = {
      success: true,
      waveNumber,
      reviews,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Wave error:", error);
    const message = error instanceof Error ? error.message : "Wave processing failed";
    return NextResponse.json(
      { success: false, waveNumber: 0, reviews: [], error: message },
      { status: 500 }
    );
  }
}
