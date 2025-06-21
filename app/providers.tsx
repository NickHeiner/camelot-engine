'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {convex ? (
        <ConvexProvider client={convex}>{children}</ConvexProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
