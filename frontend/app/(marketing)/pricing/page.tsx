"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CTASection } from "../components/CTASection";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { useMarketingContent } from "../content";

export default function PricingPage() {
  const { pages } = useMarketingContent();
  const { usageNotes, faq, hero, plans, whatsIncluded, includedItems, faqSection } = pages.pricing;

  const [country, setCountry] = useState<'US' | 'CA' | 'OTHER'>('US');
  const [detectingLocation, setDetectingLocation] = useState(true);

  // Auto-detect user's location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try to get geolocation permission
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Reverse geocode to get country
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
                );
                const data = await response.json();
                const countryCode = data.address?.country_code?.toUpperCase();

                if (countryCode === 'US') {
                  setCountry('US');
                } else if (countryCode === 'CA') {
                  setCountry('CA');
                } else {
                  setCountry('OTHER');
                }
              } catch (error) {
                console.error('Geocoding error:', error);
                setCountry('US'); // Default to USD
              } finally {
                setDetectingLocation(false);
              }
            },
            (error) => {
              // Permission denied or error - default to USD
              console.log('Location permission denied or unavailable');
              setCountry('US');
              setDetectingLocation(false);
            }
          );
        } else {
          // Geolocation not supported
          setCountry('US');
          setDetectingLocation(false);
        }
      } catch (error) {
        setCountry('US');
        setDetectingLocation(false);
      }
    };

    detectLocation();
  }, []);

  const currency = country === 'CA' ? 'CAD' : 'USD';

  return (
    <div className="bg-off text-ink">
      <PageHero
        // eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        // actions={hero.actions}
      />

      {/* Auto-detected Location Notice */}
      {/* {!detectingLocation && (
        <section className="py-4 bg-panel">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted">
              💡 Showing prices in{' '}
              <span className="font-semibold text-ink">
                {country === 'CA' ? 'CAD (Canada)' : country === 'US' ? 'USD (United States)' : 'USD (International)'}
              </span>
              {country === 'OTHER' && ' - International customers welcome'}
            </p>
          </div>
        </section>
      )} */}

      {/* Pricing Cards */}
      <section className="">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-3xl border border-border bg-panel p-6 shadow-soft sm:p-8 ${plan.featured ? "ring-2 ring-primary" : ""
                }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold text-ink">{plan.name}</h2>
                {plan.featured && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {plan.highlight}
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
                {plan.features?.map((feature) => (
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
            title={whatsIncluded.title}
            description={whatsIncluded.description}
          />
          <ul className="space-y-4 text-sm text-muted">
            {includedItems.map((item: string, idx: number) => (
              <li key={idx} className="rounded-xl border border-border bg-off/60 px-4 py-3">
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={faqSection.title}
            description={faqSection.description}
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
