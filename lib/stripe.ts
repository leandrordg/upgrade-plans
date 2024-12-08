import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function getAllPlans() {
  return stripe.plans.list({ active: true, expand: ["data.product"] });
}

export async function getPlanBySubscription(product: string) {
  return stripe.plans.retrieve(product, {
    expand: ["product"],
  });
}

export async function getSubscriptionByEmail(email: string) {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
    expand: ["data.subscriptions"],
  });

  const customer = customers.data[0];
  return customer?.subscriptions?.data[0] || null;
}
