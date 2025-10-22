"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  const { landing } = useMarketingContent();
  const t = landing.testimonials;

  return (
    <section className="relative overflow-hidden bg-off py-20">
      {/* soft ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(20,184,166,0.18),transparent_70%)] blur-md"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgba(245,158,11,0.16),transparent_70%)] blur-md"
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} description={t.description} />

        {/* Brand strip (wraps on small, “marquee-ish” feel via gap + opacity hover) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {t.brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-border/70 bg-panel/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/70 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.quotes.map(({ quote, author, role }) => (
            <article key={`${author}-${role}`} className="group relative">
              {/* gradient border wrapper */}
              <div className="rounded-3xl bg-gradient-to-br from-primary/25 via-ink/10 to-amber-200/30 p-[1px] transition duration-300 group-hover:from-primary/40 group-hover:to-amber-200/50">
                <Card className="h-full rounded-[calc(theme(borderRadius.3xl)-1px)] border border-border bg-panel/95 shadow-soft transition duration-300 group-hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
                  <CardContent className="flex h-full flex-col gap-6 p-8">
                    {/* big decorative quote */}
                    <div className="relative">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-6 -left-1 text-5xl font-black leading-none text-primary/20"
                      >
                        “
                      </span>
                      <blockquote className="relative z-10 text-base leading-relaxed text-ink">
                        {quote}
                      </blockquote>
                    </div>

                    {/* author block */}
                    <div className="mt-auto">
                      {/* simple avatar-from-initials circle */}
                      <div className="mb-3 flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {author.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{author}</p>
                          <p className="truncate text-xs uppercase tracking-wide text-muted">{role}</p>
                        </div>
                      </div>

                      {/* subtle divider */}
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </article>
          ))}
        </div>

        {/* optional CTA-style note under grid (keeps layout balanced on large screens) */}
        <p className="mx-auto max-w-3xl text-center text-xs text-muted">
          Real quotes from real operators—fast casual to fine dining—who use QuickCheck to keep the floor at capacity.
        </p>
      </div>
    </section>
  );
}
