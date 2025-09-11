"use client";

import { NavigationSection } from "./components/NavigationSection";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { IntegrationsSection } from "./components/IntegrationsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { FooterSection } from "./components/FooterSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-off text-ink">
      {/* Top Announcement */}
      <div className="bg-ink text-off text-sm py-2 text-center">
        🚀 QuickCheck v2 now supports <span className="font-semibold">two-way SMS</span> & <span className="font-semibold">multi-location</span> dashboards.
      </div>

      <NavigationSection />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
