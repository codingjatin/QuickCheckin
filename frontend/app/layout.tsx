import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickCheck',
  description: 'QuickCheck',
  icons: {
    icon: '/QuickCheck.png', // favicon or logo in public folder
  },
  openGraph: {
    title: 'QuickCheck',
    description: 'QuickCheck',
    images: ['/QuickCheck.svg'], // used for social previews
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
