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
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white to-sage/10">
      {/* Navigation */}
      <nav className="border-b border-sage/20 bg-off-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/QuickCheck.svg"
                alt="Logo"
                width={40}
                height={40}
              ></Image>
              {/* <CheckCircle className="h-8 w-8 text-indigo-600" /> */}
              <span className="text-2xl font-bold text-charcoal">
                QuickCheck
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/super-admin">
                <Button variant="outline" className="border-sage text-charcoal hover:bg-sage/10">Super Admin</Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-deep-brown hover:bg-deep-brown/90 text-off-white">{t("RestaurantLogin")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-6">
            {t("heroTitle")}{" "}
            <span className="text-deep-brown">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="text-xl text-charcoal/70 mb-8 max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kiosk">
              <Button size="lg" className="text-lg px-8 py-6 bg-deep-brown hover:bg-deep-brown/90 text-off-white">
                <Smartphone className="mr-2 h-5 w-5" />
                {t("tryKioskDemo")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-sage text-charcoal hover:bg-sage/10">
                <Monitor className="mr-2 h-5 w-5" />
                {t("viewAdminDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("featuresTitle")}
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-off-white border-sage/20">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-deep-brown" />
                </div>
                <CardTitle className="text-charcoal">{t("selfCheckIn")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal/70">{t("selfCheckInDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-off-white border-sage/20">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-deep-brown" />
                </div>
                <CardTitle className="text-charcoal">{t("smsNotifications")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal/70">{t("smsNotificationsDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-off-white border-sage/20">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-deep-brown" />
                </div>
                <CardTitle className="text-charcoal">{t("realTimeDashboard")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal/70">{t("realTimeDashboardDesc")}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-off-white border-sage/20">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-sage/20 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-deep-brown" />
                </div>
                <CardTitle className="text-charcoal">{t("smartAnalytics")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-charcoal/70">{t("smartAnalyticsDesc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-xl text-charcoal/70">{t("howItWorksSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-deep-brown rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-off-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-charcoal">
                {t("customerCheckIn")}
              </h3>
              <p className="text-charcoal/70">{t("customerCheckInDesc")}</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-sage rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-charcoal">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-charcoal">
                {t("automaticNotifications")}
              </h3>
              <p className="text-charcoal/70">{t("automaticNotificationsDesc")}</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-off-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-charcoal">
                {t("seamlessSeating")}
              </h3>
              <p className="text-charcoal/70">{t("seamlessSeatingDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              {t("testimonialsTitle")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-off-white border-sage/20">
              <CardContent className="pt-6">
                <p className="text-charcoal/70 mb-4">
                  "QuickCheck reduced our wait time complaints by 80%. Customers
                  love knowing exactly when their table will be ready."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sage/30 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-charcoal">Maria Rodriguez</p>
                    <p className="text-sm text-charcoal/60">
                      Owner, Tapas Barcelona
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-off-white border-sage/20">
              <CardContent className="pt-6">
                <p className="text-charcoal/70 mb-4">
                  "The self check-in kiosk freed up our host staff to focus on
                  customer experience instead of managing lists."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sage/30 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-charcoal">James Park</p>
                    <p className="text-sm text-charcoal/60">
                      Manager, Seoul Kitchen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-off-white border-sage/20">
              <CardContent className="pt-6">
                <p className="text-charcoal/70 mb-4">
                  "Our no-show rate dropped significantly with the automated SMS
                  confirmations and reminders."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sage/30 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-charcoal">Sarah Chen</p>
                    <p className="text-sm text-charcoal/60">
                      Owner, Garden Bistro
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-off-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/QuickCheck.png"
                  alt="Logo"
                  width={40}
                  height={40}
                ></Image>{" "}
                <span className="text-xl font-bold">QuickCheck</span>
              </div>
              <p className="text-off-white/70">
                Modern digital waitlist solutions for restaurants of all sizes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-off-white/70">
                <li>
                  <Link
                    href="/kiosk"
                    className="hover:text-off-white transition-colors"
                  >
                    Kiosk Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-off-white transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/super-admin"
                    className="hover:text-off-white transition-colors"
                  >
                    Super Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-off-white/70">
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-off-white/70">
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage/20 mt-8 pt-8 text-center text-off-white/70">
            <p>&copy; 2025 QuickCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
