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
import { Loading } from '@/components/Loading';
import dynamic from 'next/dynamic';
import {
  Users,
  Table,
  MessageSquare,
  Settings,
  Home,
  CheckCircle,
  LogOut,
} from 'lucide-react';

// Lazy load icons for better performance
const UsersIcon = dynamic(() => Promise.resolve(Users), { ssr: false });
const TableIcon = dynamic(() => Promise.resolve(Table), { ssr: false });
const MessageSquareIcon = dynamic(() => Promise.resolve(MessageSquare), { ssr: false });
const SettingsIcon = dynamic(() => Promise.resolve(Settings), { ssr: false });
const HomeIcon = dynamic(() => Promise.resolve(Home), { ssr: false });
const CheckCircleIcon = dynamic(() => Promise.resolve(CheckCircle), { ssr: false });
const LogOutIcon = dynamic(() => Promise.resolve(LogOut), { ssr: false });

const navigation = [
  { name: 'Waitlist', href: '/admin', icon: Users },
  { name: 'Tables', href: '/admin/tables', icon: Table },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { logout, phoneNumber } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-off text-ink">
      {/* Header */}
      <header className="bg-panel border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-primary" />
                <span className="text-2xl font-display font-bold">QuickCheck</span>
              </Link>
              <div className="hidden sm:block text-sm text-muted">
                Restaurant Admin • Bella Vista
              </div>
              <div className="hidden sm:block text-xs text-muted">
                {phoneNumber}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ink/15 text-ink hover:bg-off"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t('home')}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-ink/15 text-ink hover:bg-off"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-panel border-r border-border min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:text-ink hover:bg-off'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper requiredRole="admin">
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthWrapper>
  );
}