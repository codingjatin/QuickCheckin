"use client";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-panel border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/QuickCheck.svg" alt="Logo" width={38} height={38} />
              <span className="text-lg font-bold">QuickCheck</span>
            </div>
            <p className="text-muted mb-4">
              Digital waitlist & reservations for restaurants of all sizes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/kiosk" className="hover:text-ink">
                  Kiosk Demo
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ink">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/super-admin" className="hover:text-ink">
                  Super Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="#" className="hover:text-ink">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="#" className="hover:text-ink">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-muted">
          <p>&copy; {new Date().getFullYear()} QuickCheck. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
