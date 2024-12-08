import { Stripe } from "stripe";

import { formatPeriod, formatPrice } from "@/lib/utils";

import { PaymentButton } from "@/components/payment-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  plan: Stripe.Plan;
  product: Stripe.Product;
};

export function PlanCard({ plan, product }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <h1 className="text-4xl font-bold text-primary">
          {formatPrice(plan.amount ?? 0)}{" "}
          <span className="text-xs text-muted-foreground font-normal">
            {formatPeriod(plan.interval)}
          </span>
        </h1>

        <CardDescription>{product.description}</CardDescription>
      </CardContent>

      <CardFooter className="mt-auto">
        <PaymentButton id={plan.id}>
          Fazer upgrade para {product.name}
        </PaymentButton>
      </CardFooter>
    </Card>
  );
}
