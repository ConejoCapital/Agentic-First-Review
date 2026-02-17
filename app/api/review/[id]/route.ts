import { NextRequest, NextResponse } from "next/server";

// Lazy-initialize Redis to avoid errors when env vars aren't set
async function getRedis() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const redis = await getRedis();
    if (!redis) {
      return NextResponse.json(
        { error: "Storage not configured" },
        { status: 404 }
      );
    }

    const data = await redis.get(`review:${params.id}`);
    if (!data) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch review error:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const redis = await getRedis();
    if (!redis) {
      return NextResponse.json(
        { error: "Storage not configured" },
        { status: 501 }
      );
    }

    const body = await request.json();
    const data = {
      id: params.id,
      url: body.url,
      reviews: body.reviews,
      aggregate: body.aggregate,
      createdAt: new Date().toISOString(),
    };

    // Store with 24h TTL
    await redis.set(`review:${params.id}`, JSON.stringify(data), { ex: 86400 });

    return NextResponse.json({ success: true, id: params.id });
  } catch (error) {
    console.error("Save review error:", error);
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}
