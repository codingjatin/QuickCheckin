// app/(marketing)/layout.tsx
import type { Metadata } from "next";

import { AnnouncementBar } from "./components/AnnouncementBar";
import { NavigationSection } from "./components/NavigationSection";
import { FooterSection } from "./components/FooterSection";

const SITE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "")) ||
  "http://localhost:3000";

export const metadata: Metadata = {
  // 👇 lets Next resolve absolute URLs for OG/Twitter images, etc.
  metadataBase: new URL(SITE_URL),

  // optional: gives you a nice default + template for page titles
  title: {
    default: "QuickCheck | Digital Waitlists & Reservations that Text Back",
    template: "%s | QuickCheck",
  },
  description:
    "Automate waitlists, two-way SMS, and table management with QuickCheck. Reduce walk-offs, turn tables faster, and deliver a calmer service for every guest.",

  openGraph: {
    title: "QuickCheck | Digital Waitlists & Reservations that Text Back",
    description:
      "Automate waitlists, two-way SMS, and table management with QuickCheck. Reduce walk-offs, turn tables faster, and deliver a calmer service for every guest.",
    url: SITE_URL,
    siteName: "QuickCheck",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCheck | Digital Waitlists & Reservations that Text Back",
    description:
      "Automate waitlists, two-way SMS, and table management with QuickCheck. Reduce walk-offs, turn tables faster, and deliver a calmer service for every guest.",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-off text-ink">
      <AnnouncementBar />
      <NavigationSection />
      <main>{children}</main>
      <FooterSection />
    </div>
  );
}
