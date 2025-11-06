"use client";

import Link from "next/link";
import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { useMarketingContent } from "../content";

export default function PricingPage() {
  const { pages } = useMarketingContent(); // <-- language-aware content
  const { plans, usageNotes, comparison, faq, hero } = pages.pricing;

  return (
    <div className="bg-off text-ink">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={hero.actions}
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-3xl border border-border bg-panel p-6 shadow-soft sm:p-8 ${
                plan.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold text-ink">{plan.name}</h2>
                {plan.featured && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {plan.highlight.includes("popular") ? "Most popular" : ""}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-ink">{plan.price}</span>
                {plan.cadence && (
                  <span className="ml-1 text-sm text-muted">{plan.cadence}</span>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold text-primary">{plan.highlight}</p>

              <ul className="mt-6 space-y-2 text-sm text-muted">
                {(plan.features ?? []).map((feature) => (
                  <li key={feature} className="rounded-xl bg-off/70 px-4 py-2">
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {plan.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-panel py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Usage notes"
            description="Transparent billing keeps finance teams and operators aligned."
          />
          <ul className="space-y-4 text-sm text-muted">
            {usageNotes.map((note) => (
              <li key={note} className="rounded-xl border border-border bg-off/60 px-4 py-3">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            title="Plan comparison"
            description="Feature availability across Starter, Pro, and Enterprise."
          />
          <div className="overflow-x-auto rounded-2xl border border-border bg-panel shadow-soft">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-off/70">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-muted">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted">Starter</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted">Pro</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" className="whitespace-nowrap px-4 py-4 text-left text-ink">{row.feature}</th>
                    <td className="whitespace-nowrap px-4 py-4 text-muted">{row.starter}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-muted">{row.pro}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-muted">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-panel py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pricing FAQ"
            description="Common questions about billing, trials, and credits."
          />
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-border bg-off/60 p-6 shadow-soft">
                <summary className="cursor-pointer text-base font-semibold text-ink">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
