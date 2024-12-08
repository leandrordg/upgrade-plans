import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex items-center gap-4 h-14 border-b shadow-sm px-6 lg:px-10">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        Início
      </Link>

      <div className="flex items-center gap-4 ml-auto">
        <SignedIn>
          <UserNav />
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
