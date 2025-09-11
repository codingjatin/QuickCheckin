"use client";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import Image from "next/image";

export function NavigationSection() {
  return (
    <nav className="bg-panel/80 backdrop-blur supports-[backdrop-filter]:bg-panel/70 sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/QuickCheck.svg" alt="QuickCheck Logo" width={36} height={36} />
            <span className="text-xl font-bold tracking-tight">QuickCheck</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/super-admin">
              <Button variant="outline" className="border-border text-ink hover:bg-off">
                Super Admin
              </Button>
            </Link>
            <Link href="/admin">
              <Button className="bg-primary text-white hover:bg-primary-600">
                Restaurant Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
