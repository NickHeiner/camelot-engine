import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/shared/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camelot - Classic Board Game',
  description: 'Play the classic board game Camelot online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
