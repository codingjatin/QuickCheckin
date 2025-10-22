"use client";

import { useId } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function ProblemOutcomeSection() {
  const { landing } = useMarketingContent();
  const { eyebrow, title, description, problems, outcomes, note, labels } =
    landing.problemOutcome;

  // for a11y associations
  const problemsId = useId();
  const outcomesId = useId();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Problems */}
          <div aria-labelledby={problemsId} className="space-y-6">
            <h3
              id={problemsId}
              className="text-xs font-semibold uppercase tracking-wide text-muted"
            >
              {labels.problemsHeading}
            </h3>

            <ul
              role="list"
              className="grid gap-4 sm:grid-cols-2"
            >
              {problems.map((item) => (
                <li key={item.title}>
                  <article
                    className="group relative overflow-hidden rounded-2xl border border-border bg-off/70 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition hover:shadow-md"
                  >
                    {/* subtle top gradient bar */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary/60 via-primary to-primary/60 opacity-70"
                    />
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-base font-semibold text-ink">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <aside
            aria-labelledby={outcomesId}
            className="relative overflow-hidden rounded-3xl border border-border bg-ink text-off shadow-soft"
          >
            {/* decorative gradient edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10"
            />
            <div className="absolute -inset-1 -z-10 rounded-3xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(20,184,166,.25),transparent_45%),radial-gradient(120%_120%_at_100%_0%,rgba(245,158,11,.18),transparent_45%)]" />
            <div className="p-8 sm:p-10">
              <h3
                id={outcomesId}
                className="text-xs font-semibold uppercase tracking-wide text-off/70"
              >
                {labels.outcomesHeading}
              </h3>

              <ul role="list" className="mt-6 space-y-5">
                {outcomes.map((o) => (
                  <li key={o.stat} className="flex gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/20 text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {o.stat}
                      </p>
                      <p className="text-sm text-off/80">{o.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl bg-white/10 px-4 py-3 text-sm text-off/85 backdrop-blur">
                {note}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
