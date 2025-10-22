"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { useHero } from "../content";

export function HeroSection() {
  const { eyebrow, title, description, primaryCta, secondaryCta, stats } = useHero();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-sage/10 to-secondary/10" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-muted sm:text-xl">
            {description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-semibold text-ink transition hover:bg-off focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {secondaryCta.label}
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-semibold text-ink">{stat.value}</span> {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-border bg-panel p-4 shadow-soft">
            <Image
              src="/heroimg.png"
              alt="Hosts monitoring QuickCheck waitlist dashboard"
              width={720}
              height={520}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
          <div className="absolute -top-6 right-6 flex items-center gap-3 rounded-full border border-border bg-panel px-4 py-2 shadow-soft">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-success" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Live queue feed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
