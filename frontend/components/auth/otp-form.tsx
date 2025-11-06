"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth-store";
import { useTranslation } from "@/lib/i18n";
import { MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";

export function OtpForm() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { phoneNumber, userRole, generatedOtp, verifyOtp, logout } = useAuthStore();

  useEffect(() => {
    document.getElementById("otp-input")?.focus();
  }, []);

  const handleVerify = async () => {
    if (otp.length !== 4) return setError(t("pleaseEnterCompleteOtp"));
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));
    const valid = verifyOtp(otp);
    if (!valid) {
      setError(t("invalidOtp"));
      setOtp("");
    }
    setIsVerifying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <MessageSquare className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-ink mb-2">{t("verifyYourNumber")}</h2>
        <p className="text-sm text-muted">{t("weveSentCode")} <br /><span className="font-medium text-ink">{phoneNumber}</span></p>
      </div>

      <div>
        <Label htmlFor="otp-input" className="text-sm font-medium text-ink">
          {t("enterOtpCode")}
        </Label>
        <Input
          id="otp-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
          maxLength={4}
          inputMode="numeric"
          className="mt-2 text-center text-2xl tracking-widest font-mono h-12 rounded-xl border-border focus-visible:ring-2 focus-visible:ring-primary"
        />
        {error && <p className="text-error text-sm mt-2">{error}</p>}
      </div>

      <div className="bg-off/50 rounded-lg border border-border p-3 text-center text-sm">
        <p className="text-muted">
          {t("demoMode")} — {t("yourOtpIs")}{" "}
          <span className="font-mono font-bold text-ink">{generatedOtp}</span>
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full h-12 text-lg bg-primary text-white hover:bg-primary-600 rounded-xl shadow transition"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              {t("verifying")}
            </div>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {t("verifyAndContinue")}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={logout}
          className="w-full h-12 text-lg border-border text-ink hover:bg-off rounded-xl"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t("backToLogin")}
        </Button>
      </div>

      <div className="text-center text-sm text-muted">
        <p>
          {t("accessing")}{" "}
          <span className="font-medium text-ink capitalize">{t(userRole || "guest")}</span>{" "}
          {t("panel")}
        </p>
      </div>
    </motion.div>
  );
}
