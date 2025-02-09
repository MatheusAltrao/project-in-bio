import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json();

  const priceId = isSubscription
    ? process.env.STRIPE_SUBSCRIPTION_ID
    : process.env.STRIPE_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    /*  customer:, */
    payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
    mode: isSubscription ? "subscription" : "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.get("origin")}/${metadata.profileId}`,
    cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`,
    metadata,
  });

  return NextResponse.json({
    sessionId: session.id,
  });
}
