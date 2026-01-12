"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarketingContent } from "../content";
import { SectionHeading } from "./SectionHeading";

export function IntegrationsSection() {
  const { landing } = useMarketingContent();
  const integ = landing.integrations;

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={integ.eyebrow}
          title={integ.title}
          description={integ.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {integ.cards.map(({ icon: Icon, title, description, bullets }) => (
            <Card key={title} className="border border-border bg-panel shadow-none">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-off text-ink">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <CardTitle className="text-xl font-semibold text-ink">{title}</CardTitle>
                <CardDescription className="text-sm text-muted">{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted">
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
