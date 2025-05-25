import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Navigation } from '@/components/shared/navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camelot - Classic Board Game',
  description: 'Play the classic board game Camelot online',
};

// Check if Clerk keys are available
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If no Clerk keys, render without ClerkProvider (for CI/build environments)
  if (!clerkPublishableKey) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
