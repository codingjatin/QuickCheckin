"use client";

import { useAuthStore } from "@/lib/auth-store";
import { LoginForm } from "./login-form";
import { OtpForm } from "./otp-form";
import { motion } from "framer-motion";

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredRole?: "guest" | "admin";
}

export function AuthWrapper({ children, requiredRole }: AuthWrapperProps) {
  const { isAuthenticated, userRole, currentStep } = useAuthStore();

  if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-off to-primary/10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-border bg-panel/70 backdrop-blur-md shadow-2xl p-6"
      >
        {currentStep === "login" && <LoginForm />}
        {currentStep === "otp" && <OtpForm />}
      </motion.div>
    </div>
  );
}
