'use client';

import dynamic from 'next/dynamic';

export const ClientOnlyBoard = dynamic(
  () => import('./Board').then((mod) => mod.Board),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-0 border-4 border-amber-900 shadow-2xl">
          <div className="col-span-12 aspect-[12/17] bg-amber-100 animate-pulse" />
        </div>
      </div>
    ),
  }
);

