import { PlanCard } from "@/components/plan-card";

const features = [
  {
    id: 1,
    name: "Participe de eventos exclusivos.",
  },
  {
    id: 2,
    name: "Receba suporte prioritário.",
  },
  {
    id: 3,
    name: "Descontos em produtos parceiros.",
  },
  {
    id: 4,
    name: "Novos recursos em primeira mão.",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium">Planos com Stripe</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlanCard features={features} />
      </section>
    </div>
  );
}
