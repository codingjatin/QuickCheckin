"use client";

import { useTranslation } from "@/lib/i18n";

export function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      step: "1",
      title: t("customerCheckIn"),
      desc: t("customerCheckInDesc"),
    },
    {
      step: "2",
      title: t("automaticNotifications"),
      desc: t("automaticNotificationsDesc"),
    },
    {
      step: "3",
      title: t("seamlessSeating"),
      desc: t("seamlessSeatingDesc"),
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
            Three steps to calmer service
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            From walk-in to seated—without the frantic callbacks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-xl2 p-8 bg-off ring-1 ring-border">
              <div className="w-10 h-10 rounded-full bg-ink text-off flex items-center justify-center font-semibold mb-4">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
