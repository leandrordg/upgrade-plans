import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBagIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-medium">Confirmação de pagamento</h1>

      <Card>
        <CardHeader className="md:text-center md:items-center">
          <ShoppingBagIcon className="size-8 mb-4 text-primary" />
          <CardTitle>Assinatura confirmada</CardTitle>
          <CardDescription>
            Obrigado por se juntar a nós! Sua assinatura foi confirmada com
            sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="md:text-center">
          <p className="text-sm">
            Sua assinatura foi confirmada com sucesso! Você receberá um e-mail
            com mais detalhes.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
