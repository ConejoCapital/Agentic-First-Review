import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl, contentToPromptText } from "@/lib/scraper";
import { checkRateLimit } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Rate limit check for free tier (no API key = free tier)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Free tier allows 1 review per day. Upgrade to Pro for unlimited reviews.",
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // Scrape the URL
    const scraped = await scrapeUrl(parsedUrl.toString());
    const content = contentToPromptText(scraped);

    // Generate a review ID
    const reviewId = `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      reviewId,
      content,
      url: parsedUrl.toString(),
      title: scraped.title,
    });
  } catch (error) {
    console.error("Review init error:", error);
    const message = error instanceof Error ? error.message : "Failed to initialize review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
