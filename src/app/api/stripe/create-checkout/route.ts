import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { metadata, isSubscription } = await req.json();

  const priceId = isSubscription
    ? process.env.STRIPE_SUBSCRIPTION_ID
    : process.env.STRIPE_PRICE_ID;

  const userSession = await auth();

  if (
    !userSession?.user ||
    !userSession?.user?.email ||
    !userSession?.user?.id
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = userSession.user?.id;
  const userEmail = userSession.user?.email;
  const userName = userSession.user?.name;

  const userRef = await db.collection("users").doc(userId ?? "");
  const userDoc = await userRef.get();

  let customerId;

  if (userDoc.exists) {
    customerId = userDoc.data()?.customerId;
  }

  if (!customerId) {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      name: userName || "Sem nome",
      metadata: {
        userId: userId,
      },
    });

    customerId = newCustomer.id;

    await userRef.update({ customerId });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
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
