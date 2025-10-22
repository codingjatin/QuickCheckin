"use client";

import Link from "next/link";
import { useMarketingContent } from "../content";

export function CTASection() {
  const { landing } = useMarketingContent();
  const cta = landing.cta;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl bg-ink px-8 py-16 text-center text-off shadow-soft sm:px-12">
        <h3 className="font-display text-3xl font-semibold sm:text-4xl">
          {cta.title}
        </h3>
        <p className="mt-4 text-base text-off/80 sm:text-lg">
          {cta.description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={cta.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-white"
          >
            {cta.primaryCta.label}
          </Link>
          <Link
            href={cta.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-white"
          >
            {cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
