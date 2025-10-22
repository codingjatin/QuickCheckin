"use client";

import Link from "next/link";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function ReliabilitySection() {
  const { landing } = useMarketingContent();
  const r = landing.reliability;

  return (
    <section className="border-y border-border bg-off py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={r.eyebrow}
          title={r.title}
          description={r.description}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {r.highlights.map(({ stat, description }) => (
            <div
              key={`${stat}-${description}`}
              className="rounded-2xl border border-border bg-panel p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <h3 className="text-lg font-semibold text-ink">{stat}</h3>
              <p className="mt-2 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-panel/70 p-6 text-sm text-muted">
          {/** Use the localized link label + href */}
          <Link href={r.link.href} className="font-semibold text-primary hover:text-primary-600">
            {r.link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
