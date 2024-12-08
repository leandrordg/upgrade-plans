import Link from "next/link";

import { getPlanBySubscription } from "@/lib/stripe";
import { formatPeriod, formatPrice } from "@/lib/utils";
import { Stripe } from "stripe";

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
  subscription: Stripe.Subscription;
};

export async function SubscriptionCard({ subscription }: Props) {
  const plan = await getPlanBySubscription(
    subscription.items.data[0].plan.id
  );

  const product = plan.product as Stripe.Product;

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
        <Button size="sm" variant="secondary" asChild>
          <Link href={`/account/plans`}>
            Editar plano atual <PenIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
