"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Explicitly type the parameter 'url' as 'string'
  const handleRedirect = (url: string): void => {
    router.push(url); // Redirect to the given URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-off p-4 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 bg-panel rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Left Side - Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Image src="/QuickCheck.svg" alt="QuickCheck logo" width={32} height={32} />
              </div>
              <h1 className="text-2xl font-display font-bold text-ink tracking-tight">
                QuickCheck
              </h1>
            </Link>
            {/* <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-3">
              {currentStep === "otp" ? "Verify Code" : "Create an account"}
            </h2>
            <p className="text-muted text-lg">
              {currentStep === "otp"
                ? "Enter the code sent to your mobile"
                : "Sign up and get 30 day free trial"}
            </p> */}
          </div>

          <div className="w-full max-w-sm">
            {currentStep === "login" && <LoginForm />}
            {currentStep === "otp" && <OtpForm />}
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 flex justify-between text-xs text-muted">
            <span>
              Don't have any account? 
              <span
                className="underline cursor-pointer hover:text-primary"
                onClick={() => handleRedirect('/signup')}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block relative bg-sage/20">
          <img
            src="/Restaurant_Login_image.avif"
            alt="Restaurant Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-12 text-white">
            {/* Optional overlay content can go here if needed, keeping it clean for now as per image inspiration */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
