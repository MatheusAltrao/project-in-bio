import { db } from "@/lib/firebase";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !secret) {
      throw new Error("Stripe signature or secret is missing");
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case "checkout.session.completed": // usuario completou o checkout - assinatura ou pagamento único
        if (event.data.object.payment_status === "paid") {
          const userId = "";
          await db.collection("users").doc(userId).update({
            isSubscribed: true,
          });
        }

        if (
          event.data.object.payment_status === "unpaid" &&
          event.data.object.payment_intent
        ) {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent.toString()
          );

          const hostedVaucherUrl =
            paymentIntent.next_action?.boleto_display_details
              ?.hosted_voucher_url;

          if (hostedVaucherUrl) {
            const userEmail = event.data.object.customer_details?.email;
            console.log("enviar email ao cliente com boleto");
          }
        }
        break;
      case "checkout.session.async_payment_succeeded": // usuario pagou o boleto - pagamento asincrono
        if (event.data.object.payment_status === "paid") {
          const userId = "";
          await db.collection("users").doc(userId).update({
            isSubscribed: true,
          });
        }

        break;
      case "customer.subscription.deleted": // cancelou a assinatura
        const userId = "";
        await db.collection("users").doc(userId).update({
          isSubscribed: false,
        });
        break;
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
