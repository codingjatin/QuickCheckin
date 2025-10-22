"use client";

import { useMemo } from "react";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

/**
 * Fancy feature tiles with gradient frames, soft glass panel,
 * and subtle parallax hover. Fully responsive & a11y-friendly.
 */
export function FeaturesSection() {
  const { landing } = useMarketingContent();
  const { title, description, highlights } = landing.features;

  // simple stagger for entrance animations (CSS-only)
  const delays = useMemo(
    () => ["[animation-delay:60ms]", "[animation-delay:120ms]", "[animation-delay:180ms]", "[animation-delay:240ms]"],
    []
  );

  return (
    <section className="relative overflow-hidden bg-off py-20">
      {/* decorative background accents (no extra deps) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(60%_60%_at_20%_30%,rgba(20,184,166,0.20),transparent_60%),radial-gradient(55%_55%_at_80%_10%,rgba(245,158,11,0.14),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-72 bg-[radial-gradient(60%_60%_at_10%_80%,rgba(167,184,168,0.18),transparent_60%),radial-gradient(55%_55%_at_90%_80%,rgba(20,184,166,0.16),transparent_60%)]"
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} />

        <ul
          role="list"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map(({ title, description, icon: Icon }, i) => (
            <li key={title} className="animate-[fadeInUp_.5s_ease_forwards] opacity-0 will-change-transform data-[ready=true]:opacity-100">
              {/* Gradient frame wrapper */}
              <div
                className={[
                  "group relative h-full rounded-2xl p-[1px]",
                  "bg-gradient-to-br from-primary/35 via-transparent to-secondary/35",
                  "transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1",
                  delays[i % delays.length],
                ].join(" ")}
                data-ready="true"
              >
                {/* Inner panel */}
                <article
                  className="relative h-full rounded-2xl border border-border bg-white/80 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-ink/70"
                >
                  {/* Subtle glow on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 10% 0%, rgba(20,184,166,0.20), transparent 60%), radial-gradient(60% 60% at 100% 0%, rgba(245,158,11,0.18), transparent 60%)",
                    }}
                  />

                  {/* Icon pill */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-ink">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>

                  {/* Footer micro-accent */}
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted/80">
                    <span className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/70 to-secondary/70" />
                    <span className="select-none">
                      {/* decorative label (no link) */}
                      {i % 2 === 0 ? "Core module" : "Pro-ready"}
                    </span>
                  </div>
                </article>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* tiny CSS keyframes (scoped via arbitrary values) */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
