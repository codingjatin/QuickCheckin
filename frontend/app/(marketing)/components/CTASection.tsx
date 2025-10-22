"use client";

import Link from "next/link";
import { useMarketingContent } from "../content";

export function CTASection() {
  const { landing } = useMarketingContent();
  const cta = landing.cta;

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* ambient gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(65%_65%_at_80%_30%,rgba(245,158,11,0.16),transparent_60%)]"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(43,46,52,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(43,46,52,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* gradient border wrapper */}
        <div className="rounded-3xl bg-gradient-to-br from-primary/40 via-white/10 to-amber-200/40 p-[1.5px] shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <div className="rounded-[calc(theme(borderRadius.3xl)-1.5px)] bg-ink px-6 py-12 text-center text-off shadow-soft sm:px-10 md:px-12 md:py-16">
            <h3 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {cta.title}
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-base text-off/80 sm:text-lg">
              {cta.description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={cta.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition [text-shadow:0_1px_0_rgba(0,0,0,0.15)] hover:translate-y-[-1px] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {cta.primaryCta.label}
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 10h9M10 5l4.5 4.5L10 14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href={cta.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                {cta.secondaryCta.label}
              </Link>
            </div>

            {/* tiny trust row (non-intrusive, responsive) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-off/60">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                99.9% uptime target
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                Two-way SMS & multi-location
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
