import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  if (price === 0) return "Grátis";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
}

export function formatPeriod(period: string) {
  switch (period) {
    case "day":
      return "/dia";
    case "week":
      return "/semana";
    case "month":
      return "/mês";
    case "year":
      return "/ano";
    default:
      return period;
  }
}
