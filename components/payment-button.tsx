"use client";

import { useCallback } from "react";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
  id: string;
};
export function PaymentButton({ id, children }: Props) {
  const stripePromise = loadStripe(
    process.env.STRIPE_PUBLISHABLE_KEY!
  );

  const fetchClientSecret = useCallback(async () => {
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, [id]);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Confirme o pagamento para fazer upgrade para o plano selecionado.
          </DialogDescription>
        </DialogHeader>

        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout className="max-h-[512px] overflow-y-auto rounded-lg" />
        </EmbeddedCheckoutProvider>
      </DialogContent>
    </Dialog>
  );
}
