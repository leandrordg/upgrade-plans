import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Planos com Stripe",
  description:
    "Este é um exemplo de integração entre Stripe, Next.js 15 e Clerk Authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} antialiased`}>
        <main className="max-w-7xl mx-auto p-6 lg:p-10">{children}</main>
      </body>
    </html>
  );
}
