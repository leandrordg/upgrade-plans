import { NextResponse } from "next/server";

import { Stripe } from "stripe";

export async function POST(request: Request) {
  const { id }: { id: string } = await request.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-11-20.acacia",
  });

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      payment_method_types: ["card"],
      return_url: `${request.headers.get(
        "origin"
      )}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
