'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ThemeProvider>
  );
}
