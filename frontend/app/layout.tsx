import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import { AuthHydration } from '@/components/auth/auth-hydration';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'QuickCheck - Smart Digital Waitlists',
  description: 'Transform your restaurant experience with QuickCheck\'s digital waitlist system. Self check-in kiosks, instant SMS notifications, and real-time dashboards.',
  keywords: 'restaurant, waitlist, digital, SMS, notifications, kiosk, dashboard',
  authors: [{ name: 'QuickCheck Team' }],
  creator: 'QuickCheck',
  publisher: 'QuickCheck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/QuickCheck.png',
    apple: '/QuickCheck.png',
  },
  openGraph: {
    title: 'QuickCheck - Smart Digital Waitlists',
    description: 'Transform your restaurant experience with QuickCheck\'s digital waitlist system.',
    url: 'https://quickcheck.app',
    siteName: 'QuickCheck',
    images: [
      {
        url: '/QuickCheck.svg',
        width: 1200,
        height: 630,
        alt: 'QuickCheck Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickCheck - Smart Digital Waitlists',
    description: 'Transform your restaurant experience with QuickCheck\'s digital waitlist system.',
    images: ['/QuickCheck.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthHydration />
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
