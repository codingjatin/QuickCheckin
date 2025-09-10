"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  MessageSquare,
  Monitor,
  Users,
  CheckCircle,
  Smartphone,
  Utensils,
  BarChart3,
  Shield,
  PlugZap,
  Sparkles,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-off text-ink">
      {/* Top Announcement / utility */}
      <div className="bg-ink text-off text-sm py-2 text-center">
        🚀 QuickCheck v2 now supports <span className="font-semibold">two-way SMS</span> & <span className="font-semibold">multi-location</span> dashboards.
      </div>

      {/* Navigation */}
      <nav className="bg-panel/80 backdrop-blur supports-[backdrop-filter]:bg-panel/70 sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/QuickCheck.png" alt="QuickCheck Logo" width={36} height={36} />
              <span className="text-xl font-bold tracking-tight">QuickCheck</span>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link href="/super-admin">
                <Button variant="outline" className="border-border text-ink hover:bg-off">
                  Super Admin
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-primary text-white hover:bg-primary-600">
                  {t("RestaurantLogin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-sage/10 to-secondary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" /> Modern waitlist & reservations
              </span>
              <h1 className="font-display font-extrabold mt-4 mb-4 leading-tight"
                  style={{ fontSize: "clamp(2.4rem, 2.4vw + 1rem, 3.25rem)" }}>
                Stop juggling paper lists. Start seating smarter with <span className="text-primary">QuickCheck</span>.
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-xl">
                A digital waitlist and reservation platform for restaurants. Self check-in, automated two-way SMS, real-time seating, and analytics—so you turn tables faster with fewer no-shows.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/kiosk">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary-600">
                    <Smartphone className="mr-2 h-5 w-5" />
                    {t("tryKioskDemo")}
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button size="lg" variant="outline" className="border-ink/15 hover:bg-off">
                    <Monitor className="mr-2 h-5 w-5" />
                    {t("viewAdminDashboard")}
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-8 flex items-center gap-6 text-sm text-muted">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">MR</div>
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">JP</div>
                  <div className="w-8 h-8 rounded-full bg-sage/40 flex items-center justify-center">SC</div>
                </div>
                <span>Trusted by fast-casuals & busy bistros</span>
              </div>
            </div>

            {/* Hero mock panel */}
            <div className="relative">
              <div className="bg-panel rounded-xl2 p-6 shadow-soft ring-1 ring-border">
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="border border-border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted">Current Wait</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-semibold">15–20 min</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border border-border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted">In Queue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-semibold">12</div>
                    </CardContent>
                  </Card>
                  <Card className="border border-border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted">Tables Free</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-semibold text-success">4</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 space-y-2">
                  {[
                    { label: "Party of 4", ticket: "#12" },
                    { label: "Party of 2", ticket: "#13" },
                    { label: "Party of 6", ticket: "#14" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg border border-border">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-primary font-semibold">{r.ticket}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-3 -right-3 bg-secondary text-ink font-semibold text-xs py-1 px-3 rounded-full shadow-soft">
                Live
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome-driven Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold"
                style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
              Do more with the team you’ve got
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              Replace manual lists with one system that keeps guests informed and your floor flowing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: t("selfCheckIn"),
                desc: t("selfCheckInDesc"),
              },
              {
                icon: MessageSquare,
                title: t("smsNotifications"),
                desc: t("smsNotificationsDesc"),
              },
              {
                icon: Monitor,
                title: t("realTimeDashboard"),
                desc: t("realTimeDashboardDesc"),
              },
              {
                icon: BarChart3,
                title: t("smartAnalytics"),
                desc: t("smartAnalyticsDesc"),
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} className="border border-border hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted">{desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold"
                style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
              Three steps to calmer service
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              From walk-in to seated—without the frantic callbacks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((s, i) => (
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

      {/* Integrations + Compliance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          <Card className="border border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mb-3">
                <PlugZap className="w-6 h-6 text-info" />
              </div>
              <CardTitle>Works with your stack</CardTitle>
              <CardDescription className="text-muted">
                QuickCheck connects to leading SMS providers and POS systems.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              • Twilio / Vonage • Webhooks • POS exports (CSV) • REST API (beta)
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Privacy first</CardTitle>
              <CardDescription className="text-muted">
                GDPR-aligned data handling with role-based access (Super Admin, Restaurant Admin, Staff).
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted">
              Data retention controls • Audit logs • Encrypted at rest and in transit
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials (short & punchy) */}
      <section className="py-20 bg-off px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold"
                style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
              Loved by busy floors
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                initials: "MR",
                quote:
                  "QuickCheck reduced wait-time complaints by 80%. Guests know exactly when to return.",
                name: "Maria Rodriguez",
                role: "Owner, Tapas Barcelona",
              },
              {
                initials: "JP",
                quote:
                  "The kiosk freed our hosts to greet guests instead of chasing names.",
                name: "James Park",
                role: "Manager, Seoul Kitchen",
              },
              {
                initials: "SC",
                quote:
                  "No-shows dropped thanks to confirmations and reminders.",
                name: "Sarah Chen",
                role: "Owner, Garden Bistro",
              },
            ].map((t, i) => (
              <Card key={i} className="border border-border bg-panel">
                <CardContent className="pt-6">
                  <p className="text-ink/90 mb-4">“{t.quote}”</p>
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

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold mb-8"
              style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
            Frequently asked
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Does QuickCheck handle no-replies?",
                a: "Yes. If no reply within 7 minutes, guests get an automated reminder. A ‘N’ or timeout frees the table and updates the queue in real time.",
              },
              {
                q: "Can we customize grace periods?",
                a: "Absolutely. Set grace windows per restaurant (e.g., 15 minutes) from the Admin Panel.",
              },
              {
                q: "Do you support multiple locations?",
                a: "Yes. The Super Admin panel (Harman Singh) manages all restaurants, approvals, and status across locations.",
              },
            ].map((f, i) => (
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

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center bg-ink text-off rounded-xl2 p-10">
          <h3 className="font-display font-semibold mb-3 text-3xl">
            Ready to seat more guests with less stress?
          </h3>
          <p className="text-off/80 max-w-2xl mx-auto mb-8">
            Join restaurants using QuickCheck to automate waitlists, confirm guests, and keep tables full.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/kiosk">
              <Button size="lg" className="bg-primary text-white hover:bg-primary-600">
                <Smartphone className="mr-2 h-5 w-5" />
                {t("tryKioskDemo")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="border-white/30 text-off hover:bg-white/10">
                <Monitor className="mr-2 h-5 w-5" />
                {t("viewAdminDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-panel border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/QuickCheck.png" alt="Logo" width={28} height={28} />
                <span className="text-lg font-bold">QuickCheck</span>
              </div>
              <p className="text-muted mb-4">
                Digital waitlist & reservations for restaurants of all sizes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted">
                <li><Link href="/kiosk" className="hover:text-ink">Kiosk Demo</Link></li>
                <li><Link href="/admin" className="hover:text-ink">Admin Dashboard</Link></li>
                <li><Link href="/super-admin" className="hover:text-ink">Super Admin</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-ink">Documentation</a></li>
                <li><a href="#" className="hover:text-ink">Help Center</a></li>
                <li><a href="#" className="hover:text-ink">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-ink">Privacy</a></li>
                <li><a href="#" className="hover:text-ink">Terms</a></li>
                <li><a href="#" className="hover:text-ink">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center text-muted">
            <p>&copy; {new Date().getFullYear()} QuickCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
