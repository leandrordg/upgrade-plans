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
import { CheckIcon } from "lucide-react";

type Props = {
  features: {
    id: number;
    name: string;
  }[];
};

export function PlanCard({ features }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fazer upgrade</CardTitle>
        <CardDescription>
          Torne-se um membro premium e tenha acesso a recursos exclusivos.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <h1 className="text-4xl font-bold text-primary">
          {formatPrice(49.99)}{" "}
          <span className="text-xs text-muted-foreground font-normal">
            /mês
          </span>
        </h1>

        <p className="text-sm text-muted-foreground">
          Acesso a todos os recursos premium, incluindo novos recursos
          exclusivos.
        </p>

        <section>
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center gap-2">
              <CheckIcon className="size-4 text-primary" />
              <span>{feature.name}</span>
            </div>
          ))}
        </section>
      </CardContent>

      <CardFooter>
        <Button size="sm">Fazer upgrade</Button>

        <p className="text-sm text-muted-foreground">
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
