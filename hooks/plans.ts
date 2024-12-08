import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export const getAllPlans = async () => {
  return stripe.plans.list({ expand: ["data.product"], active: true });
};
