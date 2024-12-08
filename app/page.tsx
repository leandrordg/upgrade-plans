import { getAllPlans } from "@/hooks/plans";
import { Stripe } from "stripe";

import { PlanCard } from "@/components/plan-card";

export default async function Page() {
  const { data } = await getAllPlans();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium">Planos com Stripe</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan as Stripe.Plan}
            product={plan.product as Stripe.Product}
          />
        ))}
      </section>
    </div>
  );
}
