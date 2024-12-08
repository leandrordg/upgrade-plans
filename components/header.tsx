import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex items-center gap-4 h-14 border-b shadow-sm px-6 lg:px-10">
      <Link href="/">Início</Link>

      <div className="flex items-center gap-4 ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button variant="outline" size="sm" asChild>
            <SignInButton mode="modal">Entrar</SignInButton>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
}
