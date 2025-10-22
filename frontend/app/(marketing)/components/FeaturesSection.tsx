"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function FeaturesSection() {
  const { landing } = useMarketingContent();
  const { title, description, highlights } = landing.features;

  return (
    <section className="bg-off py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="border border-border bg-panel shadow-none transition hover:-translate-y-1 hover:shadow-soft"
            >
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <CardTitle className="text-lg font-semibold text-ink">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}