import Link from "next/link";

import { formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Feature, Plan } from "@prisma/client";
import { CheckIcon } from "lucide-react";

type Props = {
  plan: Plan;
  features: Feature[];
};

export function PlanCard({ plan, features }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <h1 className="text-4xl font-bold text-primary">
          {formatPrice(plan.price)}{" "}
          <span className="text-xs text-muted-foreground font-normal">
            /mês
          </span>
        </h1>

        <CardDescription>{plan.description}</CardDescription>

        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-center space-x-2">
              <CheckIcon className="size-4 text-primary" />

              <span>{feature.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button size="sm">Fazer upgrade</Button>

        <p className="text-xs text-muted-foreground">
          Ao fazer upgrade, você concorda com os{" "}
          <Link href="/tos" className="text-primary">
            Termos de Serviço
          </Link>{" "}
          e a{" "}
          <Link href="/privacy" className="text-primary">
            Política de Privacidade
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
