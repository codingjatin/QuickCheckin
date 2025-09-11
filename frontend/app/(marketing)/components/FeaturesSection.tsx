"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { Clock, MessageSquare, Monitor, Users, CheckCircle, Smartphone, Utensils, BarChart3, Shield, PlugZap } from "lucide-react";

export const FeaturesSection = React.memo(function FeaturesSection() {
  const { t } = useTranslation();

  const features = useMemo(() => [
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
  ], [t]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(1.75rem, 1.1vw + 1rem, 2.25rem)" }}>
            Do more with the team you've got
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Replace manual lists with one system that keeps guests informed and your floor flowing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
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
  );
});
