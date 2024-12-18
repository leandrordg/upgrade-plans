import Link from "next/link";

import { formatPeriod, formatPrice } from "@/lib/utils";
import { Stripe } from "stripe";

import { PaymentButton } from "@/components/payment-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PenIcon } from "lucide-react";

type Props = {
  plan: Stripe.Plan;
  product: Stripe.Product;
  subscription: Stripe.Subscription | null;
};

export function PlanCard({ plan, product, subscription }: Props) {
  const isActive = subscription?.items.data.some(
    (item) => item.plan.id === plan.id
  );

  if (isActive) return null;

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
        {subscription && isActive ? (
          <Button size="sm" variant="secondary" asChild>
            <Link href={`/account/plans`}>
              Editar plano atual <PenIcon />
            </Link>
          </Button>
        ) : (
          <PaymentButton id={plan.id}>
            Fazer upgrade para {product.name}
          </PaymentButton>
        )}
      </CardFooter>
    </Card>
  );
}
