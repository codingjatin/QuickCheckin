// components/navigation-section.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useNav } from "../content";

export function NavigationSection() {
  const pathname = usePathname();
  const { links, login, primaryCta } = useNav();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-panel/85 backdrop-blur supports-[backdrop-filter]:bg-panel/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Image src="/QuickCheck.svg" alt="QuickCheck logo" width={32} height={32} />
          <span className="text-base font-semibold tracking-tight sm:text-lg">
            QuickCheck
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-current={active ? "page" : undefined}
              >
                <span className={active ? "text-ink" : undefined}>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href={login.href}>{login.label}</Link>
          </Button>
          <Button asChild className="hidden sm:flex">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-ink hover:bg-off focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-border bg-off text-ink"
            >
              <div className="mt-8 flex flex-col gap-6">
                {links.map((link) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-medium hover:text-primary"
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button asChild className="w-full">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href={login.href}>{login.label}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
