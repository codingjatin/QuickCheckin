"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, PlugZap } from "lucide-react";

export function IntegrationsSection() {
  return (
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
  );
}
