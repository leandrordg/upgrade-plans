import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="flex items-center gap-4 h-14 px-6 lg:px-10">
      <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
        Início
      </Link>

      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />

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
