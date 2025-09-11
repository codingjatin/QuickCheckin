"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      initials: "MR",
      quote: "QuickCheck reduced wait-time complaints by 80%. Guests know exactly when to return.",
      name: "Maria Rodriguez",
      role: "Owner, Tapas Barcelona",
    },
    {
      initials: "JP",
      quote: "The kiosk freed our hosts to greet guests instead of chasing names.",
      name: "James Park",
      role: "Manager, Seoul Kitchen",
    },
    {
      initials: "SC",
      quote: "No-shows dropped thanks to confirmations and reminders.",
      name: "Sarah Chen",
      role: "Owner, Garden Bistro",
    },
  ];

  return (
    <section className="py-20 bg-off px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
            Loved by busy floors
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="border border-border bg-panel">
              <CardContent className="pt-6">
                <p className="text-ink/90 mb-4">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-ink text-off rounded-full flex items-center justify-center mr-3 font-semibold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
