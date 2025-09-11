"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center bg-ink text-off rounded-xl2 p-10">
        <h3 className="font-display font-semibold mb-3 text-3xl">
          Ready to seat more guests with less stress?
        </h3>
        <p className="text-off/80 max-w-2xl mx-auto mb-8">
          Join restaurants using QuickCheck to automate waitlists, confirm guests, and keep tables full.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/kiosk">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-600">
              {t("tryKioskDemo")}
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="outline" className="border-white/30 text-primary hover:bg-white/90">
              {t("viewAdminDashboard")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
