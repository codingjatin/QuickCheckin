"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { LoginForm } from "@/components/auth/login-form";
import { OtpForm } from "@/components/auth/otp-form";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, userRole, currentStep } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && userRole) {
      router.push(userRole === "guest" ? "/kiosk" : "/admin");
    }
  }, [isAuthenticated, userRole, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-off to-sage/10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-border bg-panel/70 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        <div className="text-center pt-10 pb-6 px-6 border-b border-border/50 bg-gradient-to-b from-panel/50 to-transparent">
          <div className="flex justify-center items-center gap-3 mb-3">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-display font-extrabold text-ink tracking-tight">
              QuickCheck
            </h1>
          </div>
          <p className="text-sm text-muted">
            {currentStep === "otp"
              ? "Verify your number to continue"
              : "Welcome back — let’s sign you in"}
          </p>
        </div>

        <div className="px-6 py-8">
          {currentStep === "login" && <LoginForm />}
          {currentStep === "otp" && <OtpForm />}
        </div>
      </motion.div>
    </div>
  );
}
