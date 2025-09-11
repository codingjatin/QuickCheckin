"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FAQSection() {
  const faqs = [
    {
      q: "Does QuickCheck handle no-replies?",
      a: "Yes. If no reply within 7 minutes, guests get an automated reminder. A 'N' or timeout frees the table and updates the queue in real time.",
    },
    {
      q: "Can we customize grace periods?",
      a: "Absolutely. Set grace windows per restaurant (e.g., 15 minutes) from the Admin Panel.",
    },
    {
      q: "Do you support multiple locations?",
      a: "Yes. The Super Admin panel (Harman Singh) manages all restaurants, approvals, and status across locations.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-bold mb-8" style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
          Frequently asked
        </h2>
        <div className="space-y-6">
          {faqs.map((f, i) => (
            <Card key={i} className="border border-border">
              <CardHeader>
                <CardTitle className="text-lg">{f.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted">{f.a}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
