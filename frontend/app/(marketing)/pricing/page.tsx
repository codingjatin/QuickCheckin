"use client";

import Link from "next/link";
import { useState } from "react";
import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { useMarketingContent } from "../content";

export default function PricingPage() {
  const { pages } = useMarketingContent();
  const { usageNotes, faq, hero } = pages.pricing;
  
  const [country, setCountry] = useState<'US' | 'CA' | 'OTHER'>('US');
  
  const currency = country === 'CA' ? 'CAD' : 'USD';
  
  const plans = [
    {
      name: 'Small Plan',
      price: '$299',
      currency: currency,
      cadence: 'per month',
      description: 'Perfect for restaurants with less than 50 seats.',
      highlight: '30-day free trial included',
      features: [
        'Up to 50 seats',
        'Digital waitlist & kiosk',
        'Two-way SMS messaging',
        'Real-time dashboard',
        'Basic analytics',
        'Email support',
      ],
      cta: { label: 'Start Free Trial', href: '/signup' },
      featured: false,
    },
    {
      name: 'Large Plan',
      price: '$499',
      currency: currency,
      cadence: 'per month',
      description: 'For restaurants with 50+ seats and high volume.',
      highlight: 'Most popular plan',
      features: [
        '50+ seats',
        'Everything in Small Plan',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager',
      ],
      cta: { label: 'Start Free Trial', href: '/signup' },
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      currency: '',
      cadence: '',
      description: 'Multi-location management with custom SLAs and white-glove support.',
      highlight: 'For restaurant groups',
      features: [
        'Multiple locations',
        'Custom seat limits',
        'SSO & advanced security',
        'Custom integrations',
        'White-glove onboarding',
        '24/7 priority support',
      ],
      cta: { label: 'Book a Demo', href: '/contact' },
      featured: false,
    },
  ];

  return (
    <div className="bg-off text-ink">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={hero.actions}
      />

      {/* Location Selector */}
      <section className="py-8 bg-panel">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm font-medium text-muted">Select your location:</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as 'US' | 'CA' | 'OTHER')}
              className="px-4 py-2 border border-border rounded-lg bg-off text-ink focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="US">United States (USD)</option>
              <option value="CA">Canada (CAD)</option>
              <option value="OTHER">Other Countries (USD)</option>
            </select>
          </div>
          {country === 'OTHER' && (
            <p className="mt-2 text-center text-sm text-muted">
              Pricing shown in USD. International payment methods accepted.
            </p>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
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
                    Most popular
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-ink">{plan.price}</span>
                {plan.currency && (
                  <span className="ml-1 text-sm text-muted">{plan.currency}</span>
                )}
                {plan.cadence && (
                  <span className="ml-1 text-sm text-muted">{plan.cadence}</span>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold text-primary">{plan.highlight}</p>

              <ul className="mt-6 space-y-2 text-sm text-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="rounded-xl bg-off/70 px-4 py-2">
                    ✓ {feature}
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

      {/* Usage Notes */}
      <section className="bg-panel py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What's Included"
            description="Transparent billing with all the features you need."
          />
          <ul className="space-y-4 text-sm text-muted">
            <li className="rounded-xl border border-border bg-off/60 px-4 py-3">
              ✓ 30-day free trial on all plans - no credit card required
            </li>
            <li className="rounded-xl border border-border bg-off/60 px-4 py-3">
              ✓ Unlimited SMS messaging included - no hidden fees
            </li>
            <li className="rounded-xl border border-border bg-off/60 px-4 py-3">
              ✓ Plan automatically adjusts based on your seat capacity
            </li>
            <li className="rounded-xl border border-border bg-off/60 px-4 py-3">
              ✓ Cancel anytime - no long-term contracts
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pricing FAQ"
            description="Common questions about billing, trials, and credits."
          />
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-border bg-panel p-6 shadow-soft">
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
