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
  Calendar,
  BarChart3,
  Phone,
  Mail,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FDFDFB]">
      {/* Navigation */}
      <nav className="bg-[#683326] text-[#FDFDFB] py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image src="/QuickCheck.png" alt="QuickCheck Logo" width={40} height={40}></Image>
              <span className="text-2xl font-bold">QuickCheck</span>
            </div>
            <div className="flex items-center space-x-4 text-[#683326]">
              <LanguageSwitcher />
              <Link href="/super-admin">
                <Button variant="outline" className="border-[#FDFDFB] hover:!bg-[#dbdbdb] text-[#683326]">
                  Super Admin
                </Button>
              </Link>
              <Link href="/admin">
                <Button className="bg-[#9DA993] hover:bg-[#84917d] text-[#343d43]">
                  {t("RestaurantLogin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#683326] to-[#683326] text-[#FDFDFB] overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t("heroTitle")}{" "}
                <span className="text-[#9DA993]">{t("heroTitleHighlight")}</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Link href="/kiosk">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-6 bg-[#9DA993] hover:bg-[#84917d] text-[#343d43]"
                  >
                    <Smartphone className="mr-2 h-5 w-5" />
                    {t("tryKioskDemo")}
                  </Button>
                </Link> */}
                <Link href="/admin">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-6 border-[#FDFDFB] hover:!bg-[#dbdbdb] text-[#683326]"
                  >
                    <Monitor className="mr-2 h-5 w-5" />
                    {t("viewAdminDashboard")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#FDFDFB] rounded-2xl p-6 shadow-2xl transform rotate-3">
                <div className="bg-[#f5f5f5] rounded-lg p-4 text-center mb-4">
                  <h3 className="font-bold text-[#000000]">Current Wait Time</h3>
                  <p className="text-2xl font-bold text-[#000000]">15-20 min</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-[#f5f5f5] rounded-lg">
                    <span className="font-medium text-[#343d43]">Party of 4</span>
                    <span className="text-[#683326] font-bold">#12</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f5f5f5] rounded-lg">
                    <span className="font-medium text-[#343d43]">Party of 2</span>
                    <span className="text-[#683326] font-bold">#13</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#f5f5f5] rounded-lg opacity-70">
                    <span className="font-medium text-[#343d43]">Party of 6</span>
                    <span className="text-[#683326] font-bold">#14</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#9DA993] text-[#343d43] font-bold py-1 px-3 rounded-full shadow-md">
                Live
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-[#FDFDFB] rounded-tl-full rounded-tr-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6  lg:px-8 bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#343d43] mb-4">
              {t("featuresTitle")}
            </h2>
            <p className="text-xl text-[#343d43]/80 max-w-2xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-[#FDFDFB] overflow-hidden group">
              <div className="h-2 bg-[#683326] w-0 group-hover:w-full transition-all duration-500"></div>
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-[#683326]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7 text-[#683326]" />
                </div>
                <CardTitle className="text-[#343d43]">{t("selfCheckIn")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#343d43]/80">
                  {t("selfCheckInDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-[#FDFDFB] overflow-hidden group">
              <div className="h-2 bg-[#683326] w-0 group-hover:w-full transition-all duration-500"></div>
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-[#683326]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-7 w-7 text-[#683326]" />
                </div>
                <CardTitle className="text-[#343d43]">{t("smsNotifications")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#343d43]/80">
                  {t("smsNotificationsDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-[#FDFDFB] overflow-hidden group">
              <div className="h-2 bg-[#683326] w-0 group-hover:w-full transition-all duration-500"></div>
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-[#683326]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="h-7 w-7 text-[#683326]" />
                </div>
                <CardTitle className="text-[#343d43]">{t("realTimeDashboard")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#343d43]/80">
                  {t("realTimeDashboardDesc")}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-[#FDFDFB] overflow-hidden group">
              <div className="h-2 bg-[#683326] w-0 group-hover:w-full transition-all duration-500"></div>
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-[#683326]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-7 w-7 text-[#683326]" />
                </div>
                <CardTitle className="text-[#343d43]">{t("smartAnalytics")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#343d43]/80">
                  {t("smartAnalyticsDesc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#9DA993]/20 to-[#683326]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#343d43] mb-4">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-xl text-[#343d43]/80">{t("howItWorksSubtitle")}</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#683326]/30 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="text-center bg-[#FDFDFB] p-8 rounded-2xl shadow-lg border border-[#9DA993]/20">
                <div className="mx-auto w-20 h-20 bg-[#683326] rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-2xl font-bold text-[#FDFDFB]">1</span>
                  <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-[#683326]/30 hidden md:block"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#343d43]">
                  {t("customerCheckIn")}
                </h3>
                <p className="text-[#343d43]/80">{t("customerCheckInDesc")}</p>
              </div>

              <div className="text-center bg-[#FDFDFB] p-8 rounded-2xl shadow-lg border border-[#9DA993]/20 mt-16">
                <div className="mx-auto w-20 h-20 bg-[#683326] rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-2xl font-bold text-[#FDFDFB]">2</span>
                  <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-[#683326]/30 hidden md:block"></div>
                  <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-[#683326]/30 hidden md:block"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#343d43]">
                  {t("automaticNotifications")}
                </h3>
                <p className="text-[#343d43]/80">{t("automaticNotificationsDesc")}</p>
              </div>

              <div className="text-center bg-[#FDFDFB] p-8 rounded-2xl shadow-lg border border-[#9DA993]/20">
                <div className="mx-auto w-20 h-20 bg-[#683326] rounded-full flex items-center justify-center mb-6 relative">
                  <span className="text-2xl font-bold text-[#FDFDFB]">3</span>
                  <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-[#683326]/30 hidden md:block"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#343d43]">
                  {t("seamlessSeating")}
                </h3>
                <p className="text-[#343d43]/80">{t("seamlessSeatingDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFDFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#343d43] mb-4">
              {t("testimonialsTitle")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-b from-[#FDFDFB] to-[#9DA993]/10 overflow-hidden group">
              <CardContent className="pt-6">
                <div className="absolute top-0 right-0 text-7xl opacity-10 font-serif transform translate-x-4 -translate-y-4">"</div>
                <p className="text-[#343d43]/80 mb-4 relative z-10">
                  "QuickCheck reduced our wait time complaints by 80%. Customers
                  love knowing exactly when their table will be ready."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#683326] rounded-full mr-3 flex items-center justify-center text-[#FDFDFB] font-bold">MR</div>
                  <div>
                    <p className="font-semibold text-[#343d43]">Maria Rodriguez</p>
                    <p className="text-sm text-[#343d43]/60">
                      Owner, Tapas Barcelona
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-b from-[#FDFDFB] to-[#9DA993]/10 overflow-hidden group">
              <CardContent className="pt-6">
                <div className="absolute top-0 right-0 text-7xl opacity-10 font-serif transform translate-x-4 -translate-y-4">"</div>
                <p className="text-[#343d43]/80 mb-4 relative z-10">
                  "The self check-in kiosk freed up our host staff to focus on
                  customer experience instead of managing lists."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#683326] rounded-full mr-3 flex items-center justify-center text-[#FDFDFB] font-bold">JP</div>
                  <div>
                    <p className="font-semibold text-[#343d43]">James Park</p>
                    <p className="text-sm text-[#343d43]/60">
                      Manager, Seoul Kitchen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-b from-[#FDFDFB] to-[#9DA993]/10 overflow-hidden group">
              <CardContent className="pt-6">
                <div className="absolute top-0 right-0 text-7xl opacity-10 font-serif transform translate-x-4 -translate-y-4">"</div>
                <p className="text-[#343d43]/80 mb-4 relative z-10">
                  "Our no-show rate dropped significantly with the automated SMS
                  confirmations and reminders."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#683326] rounded-full mr-3 flex items-center justify-center text-[#FDFDFB] font-bold">SC</div>
                  <div>
                    <p className="font-semibold text-[#343d43]">Sarah Chen</p>
                    <p className="text-sm text-[#343d43]/60">
                      Owner, Garden Bistro
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFDFB] text-[#683326]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of restaurants using QuickCheck to streamline their waitlist management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kiosk">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-[#9DA993] hover:bg-[#84917d] text-[#343d43]"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                {t("tryKioskDemo")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 border-[#683326]  hover:!bg-[#dbdbdb] text-[#683326]"
              >
                <Monitor className="mr-2 h-5 w-5" />
                {t("viewAdminDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#683326] text-[#FDFDFB] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-full">
                  <Image src="/QuickCheck.png" alt="Logo" width={32} height={32}></Image>
                </div>
                <span className="text-xl font-bold">QuickCheck</span>
              </div>
              <p className="text-[#9DA993] mb-4">
                Modern digital waitlist solutions for restaurants of all sizes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#9DA993] hover:text-[#FDFDFB] transition-colors">
                  <Phone className="h-5 w-5" />
                </a>
                <a href="#" className="text-[#9DA993] hover:text-[#FDFDFB] transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#9DA993]">
                <li>
                  <Link
                    href="/kiosk"
                    className="hover:text-[#FDFDFB] transition-colors"
                  >
                    Kiosk Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-[#FDFDFB] transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/super-admin"
                    className="hover:text-[#FDFDFB] transition-colors"
                  >
                    Super Admin
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#9DA993]">
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#9DA993]">
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#FDFDFB] transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#9DA993]/30 mt-8 pt-8 text-center text-[#9DA993]">
            <p>&copy; 2025 QuickCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}