import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center text-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Página não encontrada</h1>

      <p className="text-sm text-muted-foreground">
        A página que você tentou acessar não existe. Por favor, verifique o
        endereço digitado e tente novamente.
      </p>

      <Button variant="secondary" size="sm" asChild>
        <Link href="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  );
}
