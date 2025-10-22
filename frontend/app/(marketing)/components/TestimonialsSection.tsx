"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
  const { landing } = useMarketingContent();
  const t = landing.testimonials;

  return (
    <section className="bg-off py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t.title} description={t.description} />

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted">
          {t.brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full border border-border px-4 py-1 text-ink/70"
            >
              {brand}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.quotes.map(({ quote, author, role }) => (
            <Card key={`${author}-${role}`} className="border border-border bg-panel shadow-none">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <p className="text-base leading-relaxed text-ink">&ldquo;{quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-ink">{author}</p>
                  <p className="text-xs uppercase tracking-wide text-muted">{role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
