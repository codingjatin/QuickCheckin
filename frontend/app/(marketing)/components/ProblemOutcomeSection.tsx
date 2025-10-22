"use client";

import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function ProblemOutcomeSection() {
  const { landing } = useMarketingContent();
  const {
    eyebrow,
    title,
    description,
    problems,
    outcomes,
    note,
    labels,
  } = landing.problemOutcome;

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {labels.problemsHeading}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl2 border border-border bg-off/60 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  <h4 className="text-base font-semibold text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-ink/95 p-8 text-off shadow-soft">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-off/70">
              {labels.outcomesHeading}
            </h3>
            <ul className="mt-6 space-y-5">
              {outcomes.map((outcome) => (
                <li key={outcome.stat}>
                  <p className="text-lg font-semibold text-white">{outcome.stat}</p>
                  <p className="text-sm text-off/80">{outcome.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-lg bg-white/10 px-4 py-3 text-sm text-off/80">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
