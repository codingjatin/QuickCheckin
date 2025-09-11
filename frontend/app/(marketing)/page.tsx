"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";

// Lazy load components for better performance
const NavigationSection = dynamic(() => import("./components/NavigationSection").then(mod => ({ default: mod.NavigationSection })), {
  loading: () => <div className="h-16 bg-panel/80 backdrop-blur" />
});

const HeroSection = dynamic(() => import("./components/HeroSection").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <Loading />
});

const FeaturesSection = dynamic(() => import("./components/FeaturesSection").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <Loading />
});

const HowItWorksSection = dynamic(() => import("./components/HowItWorksSection").then(mod => ({ default: mod.HowItWorksSection })), {
  loading: () => <Loading />
});

const IntegrationsSection = dynamic(() => import("./components/IntegrationsSection").then(mod => ({ default: mod.IntegrationsSection })), {
  loading: () => <Loading />
});

const TestimonialsSection = dynamic(() => import("./components/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <Loading />
});

const FAQSection = dynamic(() => import("./components/FAQSection").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <Loading />
});

const CTASection = dynamic(() => import("./components/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <Loading />
});

const FooterSection = dynamic(() => import("./components/FooterSection").then(mod => ({ default: mod.FooterSection })), {
  loading: () => <Loading />
});

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
