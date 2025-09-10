'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Building,
  BarChart3,
  Settings,
  Users,
  Home,
  CheckCircle,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/super-admin', icon: BarChart3 },
  { name: 'Restaurants', href: '/super-admin/restaurants', icon: Building },
  { name: 'Users', href: '/super-admin/users', icon: Users },
  { name: 'System Settings', href: '/super-admin/settings', icon: Settings },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (in real app, check JWT token or session)
    const isAuth = sessionStorage.getItem('superAdminAuth') === 'true';

    if (!isAuth && pathname !== '/super-admin/auth') {
      router.push('/super-admin/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('superAdminAuth');
    router.push('/');
  };

  // Don't render layout for auth page
  if (pathname === '/super-admin/auth') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

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

              <div className="hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-medium text-primary">Super Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-ink/15 text-ink hover:bg-off"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-ink/15 text-ink hover:bg-off"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
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
