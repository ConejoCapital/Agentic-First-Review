import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 501 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const sessionUrl = await createCheckoutSession(
      priceId,
      `${origin}/?session=success`,
      `${origin}/pricing?session=cancelled`
    );

    if (!sessionUrl) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: sessionUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
