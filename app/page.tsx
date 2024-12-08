import { getAllPlans, getSubscriptionByEmail } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { Stripe } from "stripe";

import { FreePlanCard } from "@/components/free-plan-card";
import { PlanCard } from "@/components/plan-card";
import { SubscriptionCard } from "@/components/subscription-card";

export default async function Page() {
  const session = await currentUser();

  const [{ data }, subscription] = await Promise.all([
    getAllPlans(),
    session && session.primaryEmailAddress
      ? getSubscriptionByEmail(session.primaryEmailAddress.emailAddress)
      : Promise.resolve(null)
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium">Seu plano</h1>

      {subscription ? (
        <SubscriptionCard subscription={subscription} />
      ) : (
        <FreePlanCard />
      )}

      <h1 className="font-medium">Planos com Stripe</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            subscription={subscription}
            product={plan.product as Stripe.Product}
          />
        ))}
      </section>
    </div>
  );
}
