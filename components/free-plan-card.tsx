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
import { PenIcon } from "lucide-react";

export function FreePlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plano gratuito</CardTitle>
      </CardHeader>

      <CardContent>
        <h1 className="text-4xl font-bold text-primary">{formatPrice(0)}</h1>

        <CardDescription>
          Você está no plano gratuito. Faça upgrade para acessar mais recursos.
        </CardDescription>
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
