import { PlanCard } from "@/components/plan-card";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium">Planos com Stripe</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlanCard />
      </section>
    </div>
  );
}
