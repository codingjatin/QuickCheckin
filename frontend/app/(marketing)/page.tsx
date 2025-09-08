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
  Star,
  ArrowRight,
  Check,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-off-white">
      {/* Navigation */}
      <nav className="border-b border-sage/20 bg-off-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/QuickCheck.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-charcoal">
                QuickCheck
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-charcoal/70 hover:text-charcoal transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link href="/super-admin/auth">
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage/5 via-off-white to-deep-brown/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-sage/10 rounded-full text-sm font-medium text-deep-brown mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Transform Your Restaurant Experience
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
                {t("heroTitle")}{" "}
                <span className="text-deep-brown bg-gradient-to-r from-deep-brown to-deep-brown/80 bg-clip-text text-transparent">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-charcoal/70 mb-8 leading-relaxed">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kiosk">
                  <Button size="lg" className="text-lg px-8 py-6 bg-deep-brown hover:bg-deep-brown/90 text-off-white shadow-lg hover:shadow-xl transition-all">
                    <Smartphone className="mr-2 h-5 w-5" />
                    {t("tryKioskDemo")}
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-sage text-charcoal hover:bg-sage/10 shadow-lg hover:shadow-xl transition-all">
                    <Monitor className="mr-2 h-5 w-5" />
                    {t("viewAdminDashboard")}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-sage/30 rounded-full border-2 border-off-white"></div>
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-charcoal/70">500+ restaurants trust us</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-deep-brown">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-charcoal/70">4.9/5 rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-sage/20 to-deep-brown/20 rounded-3xl p-8 shadow-2xl">
                <div className="bg-off-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-charcoal">Live Dashboard</h3>
                    <div className="w-3 h-3 bg-sage rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-sage/10 rounded-lg">
                      <span className="text-sm text-charcoal">Customers Waiting</span>
                      <span className="font-bold text-deep-brown">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-deep-brown/10 rounded-lg">
                      <span className="text-sm text-charcoal">Avg Wait Time</span>
                      <span className="font-bold text-deep-brown">18 min</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-sage/10 rounded-lg">
                      <span className="text-sm text-charcoal">Tables Available</span>
                      <span className="font-bold text-deep-brown">3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-sage/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              {t("featuresTitle")}
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: t("selfCheckIn"),
                description: t("selfCheckInDesc"),
                color: "bg-sage/20 text-deep-brown"
              },
              {
                icon: MessageSquare,
                title: t("smsNotifications"),
                description: t("smsNotificationsDesc"),
                color: "bg-deep-brown/20 text-deep-brown"
              },
              {
                icon: Monitor,
                title: t("realTimeDashboard"),
                description: t("realTimeDashboardDesc"),
                color: "bg-sage/20 text-deep-brown"
              },
              {
                icon: BarChart3,
                title: t("smartAnalytics"),
                description: t("smartAnalyticsDesc"),
                color: "bg-deep-brown/20 text-deep-brown"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 bg-off-white border-sage/20 group hover:-translate-y-2">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-charcoal text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-charcoal/70 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Everything you need to transform your restaurant's waitlist experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-off-white border-sage/20 hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-charcoal mb-2">Starter</CardTitle>
                <div className="text-4xl font-bold text-deep-brown mb-2">$99<span className="text-lg text-charcoal/60">/month</span></div>
                <CardDescription className="text-charcoal/70">Perfect for small restaurants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Up to 50 customers/day",
                  "Basic SMS notifications",
                  "Simple dashboard",
                  "Email support"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-sage mr-3" />
                    <span className="text-charcoal/80">{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6 bg-sage hover:bg-sage/90 text-charcoal">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan - Featured */}
            <Card className="bg-deep-brown text-off-white border-deep-brown hover:shadow-xl transition-all transform scale-105">
              <CardHeader className="text-center pb-8">
                <div className="inline-block px-3 py-1 bg-sage/20 rounded-full text-xs font-medium text-off-white mb-4">
                  Most Popular
                </div>
                <CardTitle className="text-2xl mb-2">Professional</CardTitle>
                <div className="text-4xl font-bold mb-2">$199<span className="text-lg text-off-white/60">/month</span></div>
                <CardDescription className="text-off-white/70">Ideal for growing restaurants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Up to 200 customers/day",
                  "Advanced SMS & reminders",
                  "Full analytics dashboard",
                  "Table management",
                  "Priority support",
                  "Custom branding"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-sage mr-3" />
                    <span className="text-off-white/90">{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6 bg-sage hover:bg-sage/90 text-charcoal">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-off-white border-sage/20 hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl text-charcoal mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-deep-brown mb-2">$399<span className="text-lg text-charcoal/60">/month</span></div>
                <CardDescription className="text-charcoal/70">For restaurant chains</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Unlimited customers",
                  "Multi-location support",
                  "Advanced integrations",
                  "Custom workflows",
                  "Dedicated support",
                  "White-label solution"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-sage mr-3" />
                    <span className="text-charcoal/80">{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6 bg-deep-brown hover:bg-deep-brown/90 text-off-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-xl text-charcoal/70">{t("howItWorksSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                title: t("customerCheckIn"),
                description: t("customerCheckInDesc"),
                color: "bg-deep-brown"
              },
              {
                step: 2,
                title: t("automaticNotifications"),
                description: t("automaticNotificationsDesc"),
                color: "bg-sage"
              },
              {
                step: 3,
                title: t("seamlessSeating"),
                description: t("seamlessSeatingDesc"),
                color: "bg-charcoal"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`mx-auto w-20 h-20 ${item.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-3xl font-bold text-off-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-charcoal">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              {t("testimonialsTitle")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "QuickCheck reduced our wait time complaints by 80%. Customers love knowing exactly when their table will be ready.",
                author: "Maria Rodriguez",
                role: "Owner, Tapas Barcelona",
                rating: 5
              },
              {
                quote: "The self check-in kiosk freed up our host staff to focus on customer experience instead of managing lists.",
                author: "James Park",
                role: "Manager, Seoul Kitchen",
                rating: 5
              },
              {
                quote: "Our no-show rate dropped significantly with the automated SMS confirmations and reminders.",
                author: "Sarah Chen",
                role: "Owner, Garden Bistro",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-off-white border-sage/20 hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex text-deep-brown mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-charcoal/80 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-sage/30 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-charcoal">{testimonial.author}</p>
                      <p className="text-sm text-charcoal/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-brown to-deep-brown/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-off-white mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-off-white/80 mb-8">
            Join hundreds of restaurants already using QuickCheck to improve their customer experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kiosk">
              <Button size="lg" className="text-lg px-8 py-6 bg-sage hover:bg-sage/90 text-charcoal shadow-lg">
                Try Free Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-off-white text-off-white hover:bg-off-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-off-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/QuickCheck.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold">QuickCheck</span>
              </div>
              <p className="text-off-white/70 leading-relaxed">
                Modern digital waitlist solutions for restaurants of all sizes.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors cursor-pointer">
                  <span className="text-sage font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors cursor-pointer">
                  <span className="text-sage font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center hover:bg-sage/30 transition-colors cursor-pointer">
                  <span className="text-sage font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-off-white/70">
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
                    href="/super-admin/auth"
                    className="hover:text-off-white transition-colors"
                  >
                    Super Admin
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-off-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-off-white/70">
                <li>
                  <Link href="/contact" className="hover:text-off-white transition-colors">
                    Contact Us
                  </Link>
                </li>
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
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-off-white/70">
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-off-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sage/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-off-white/60">&copy; 2025 QuickCheck. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-off-white/60">Made with</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sage font-medium">Love in Canada</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}