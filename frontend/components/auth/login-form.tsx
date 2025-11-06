"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore, UserRole } from "@/lib/auth-store";
import { useTranslation } from "@/lib/i18n";
import { Phone, UserCircle2, ArrowRight } from "lucide-react";

export function LoginForm() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [errors, setErrors] = useState<{ phone?: string; role?: string }>({});
  const { login } = useAuthStore();

  const validateForm = () => {
    const e: { phone?: string; role?: string } = {};
    if (!phoneNumber.trim()) e.phone = t("pleaseEnterPhone");
    else if (!/^\+?[\d\s()-]{10,}$/.test(phoneNumber))
      e.phone = t("pleaseEnterValidPhone");
    if (!selectedRole) e.role = t("pleaseSelectAccessType");
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleContinue = () => {
    if (validateForm()) login(phoneNumber, selectedRole as UserRole);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-ink">
          {t("mobileNumber")}
        </Label>
        <div className="relative mt-2">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-muted" />
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 h-12 text-lg rounded-xl border-border focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        {errors.phone && <p className="text-error text-sm mt-2">{errors.phone}</p>}
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role" className="text-sm font-medium text-ink">
          {t("accessType")}
        </Label>
        <Select value={selectedRole} onValueChange={(v: UserRole) => setSelectedRole(v)}>
          <SelectTrigger className="h-12 mt-2 rounded-xl border-border focus-visible:ring-2 focus-visible:ring-primary">
            <SelectValue placeholder={t("selectAccessType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="guest">
              <div className="flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-secondary" />
                <span>{t("guestJoinWaitlist")}</span>
              </div>
            </SelectItem>
            <SelectItem value="admin">
              <div className="flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-primary" />
                <span>{t("adminRestaurantDashboard")}</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.role && <p className="text-error text-sm mt-2">{errors.role}</p>}
      </div>

      {/* CTA */}
      <Button
        onClick={handleContinue}
        className="w-full h-12 text-lg bg-primary text-white hover:bg-primary-600 rounded-xl shadow-md transition"
      >
        {t("continue")}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <p className="text-center text-sm text-muted">
        You’ll receive a 4-digit OTP via SMS to verify your number.
      </p>
    </motion.div>
  );
}
