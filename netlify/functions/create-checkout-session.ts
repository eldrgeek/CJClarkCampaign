import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export default async (req: Request) => {
  try {
    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount);
    const success_url = body.success_url || `${new URL(req.url).origin}/donate/success`;
    const cancel_url = body.cancel_url || `${new URL(req.url).origin}/donate`;

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY env" }), { status: 500 });
    }
    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: "Invalid amount (min $1.00)" }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Campaign Donation' },
          unit_amount: Math.round(amount),
        },
        quantity: 1,
      }],
      allow_promotion_codes: false,
      success_url,
      cancel_url,
      metadata: {
        campaign: "CJClark for City Council"
      }
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      headers: { "content-type": "application/json" }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), { status: 500 });
  }
};
