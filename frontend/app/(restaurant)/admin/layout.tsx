'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/auth-store';
import { AuthWrapper } from '@/components/auth/auth-wrapper';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/lib/i18n';
import { 
  Users, 
  Table, 
  MessageSquare, 
  Settings, 
  Home, 
  CheckCircle,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Waitlist', href: '/admin', icon: Users },
  { name: 'Tables', href: '/admin/tables', icon: Table },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { logout, phoneNumber } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-sage/5">
      {/* Header */}
      <header className="bg-off-white border-b border-sage/20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-deep-brown" />
                <span className="text-2xl font-bold text-charcoal">QuickCheck</span>
              </Link>
              <div className="hidden sm:block text-sm text-charcoal/60">
                Restaurant Admin • Bella Vista
              </div>
              <div className="hidden sm:block text-xs text-charcoal/50">
                {phoneNumber}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Link href="/">
                <Button variant="outline" size="sm" className="border-sage text-charcoal hover:bg-sage/10">
                  <Home className="h-4 w-4 mr-2" />
                  {t('home')}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-sage text-charcoal hover:bg-sage/10">
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-off-white border-r border-sage/20 min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-sage/20 text-deep-brown"
                      : "text-charcoal/70 hover:text-charcoal hover:bg-sage/10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper requiredRole="admin">
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AuthWrapper>
  );
}