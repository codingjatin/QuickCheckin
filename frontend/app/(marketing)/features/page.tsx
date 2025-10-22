import type { Metadata } from "next";

import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { getMarketingContent } from "../content";

export const metadata: Metadata = {
  title: "QuickCheck Features | Waitlist, Messaging, Analytics, and More",
  description:
    "Explore the complete QuickCheck feature set including digital waitlists, messaging engine, smart seating, analytics, branding controls, and integrations.",
};

export default function FeaturesPage() {
  // Server-safe read (defaults to English; wire your locale here if you have one)
  const content = getMarketingContent();
  const features = content.pages.features;
  const pricing = content.pages.pricing;

  return (
    <div className="bg-off text-ink">
      <PageHero
        eyebrow={features.hero.eyebrow}
        title={features.hero.title}
        description={features.hero.description}
        actions={features.hero.actions}
      />

      <section className="py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            title="Feature deep dives"
            description="Each module is modular and customizable—enable what you need today and expand as guest volume grows."
          />
          <div className="space-y-10">
            {features.clusters.map((cluster) => (
              <article
                key={cluster.category}
                className="rounded-3xl border border-border bg-panel p-6 shadow-soft sm:p-8"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {cluster.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-ink">{cluster.summary}</h2>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {cluster.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-border/70 bg-off/70 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                    >
                      <item.icon className="h-5 w-5 text-primary" aria-hidden />
                      <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-panel py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Scale with confidence"
            title="Feature availability by plan"
            description="Every plan includes unlimited users and core waitlist functionality. Advanced automation and integrations unlock with Pro and Enterprise."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {pricing.plans.map((plan) => {
              const features = plan.features ?? [];
              return (
                <div key={plan.name} className="rounded-2xl border border-border bg-off/60 p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>
                  {features.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {features.slice(0, 5).map((feature) => (
                        <li key={feature} className="rounded-lg bg-panel px-3 py-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
