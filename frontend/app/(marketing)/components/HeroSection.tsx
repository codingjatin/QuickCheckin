"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = React.memo(function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-sage/10 to-secondary/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" /> Modern waitlist & reservations
            </span>
            <h1
              className="font-display font-extrabold mt-4 mb-4 leading-tight"
              style={{ fontSize: "clamp(2.4rem, 2.4vw + 1rem, 3.25rem)" }}
            >
              Stop juggling paper lists. Start seating smarter with{" "}
              <span className="text-primary">QuickCheck</span>.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              A digital waitlist and reservation platform for restaurants. Self
              check-in, automated two-way SMS, real-time seating, and
              analytics—so you turn tables faster with fewer no-shows.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/kiosk">
                <Button size="lg" className="bg-primary text-white hover:bg-primary-600">
                  {t("tryKioskDemo")}
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-ink/15 hover:bg-off"
                >
                  {t("viewAdminDashboard")}
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-6 text-sm text-muted">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  MR
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  JP
                </div>
                <div className="w-8 h-8 rounded-full bg-sage/40 flex items-center justify-center">
                  SC
                </div>
              </div>
              <span>Trusted by fast-casuals & busy bistros</span>
            </div>
          </div>

          {/* Hero mock panel */}
          <div className="relative">
            <div >
              <Image
                src="/heroimg.png"
                alt="People eating in restaurant"
                width={700}
                height={500}
                className="rounded-lg object-cover"
                priority
              />
            </div>

            <div className="absolute -top-3 -right-3 bg-secondary text-ink font-semibold text-xs py-1 px-3 rounded-full shadow-soft">
              Live
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
