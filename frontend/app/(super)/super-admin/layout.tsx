'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Building, 
  BarChart3, 
  Settings, 
  Users, 
  Home, 
  CheckCircle 
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
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-2 h-2 bg-deep-brown rounded-full"></div>
                <span className="text-sm font-medium text-deep-brown">Super Admin</span>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-sage text-charcoal hover:bg-sage/10">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
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
                      ? "bg-deep-brown/20 text-deep-brown"
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