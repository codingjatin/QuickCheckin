"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePricingPreview } from "../content";
import { SectionHeading } from "./SectionHeading";

export function PricingPreviewSection() {
  const { eyebrow, title, description, plans, link } = usePricingPreview();

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex h-full flex-col border border-border bg-panel shadow-none transition hover:-translate-y-1 hover:shadow-soft"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-ink">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-muted">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div>
                  <span className="text-3xl font-bold text-ink">{plan.price}</span>{" "}
                  <span className="text-sm text-muted">{plan.cadence}</span>
                </div>
                <p className="text-sm font-medium text-primary">{plan.highlight}</p>
                <Link
                  href={plan.cta.href}
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-ink transition hover:bg-off focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {plan.cta.label}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-sm text-muted">
          Need a deeper comparison?{" "}
          <Link href={link.href} className="font-semibold text-primary hover:text-primary-600">
            {link.label}
          </Link>
          .
        </div>
      </div>
    </section>
  );
}
