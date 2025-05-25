'use client';

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface SquareProps {
  row: number;
  col: number;
  isHighlighted: boolean;
  children?: React.ReactNode;
}

export function Square({ row, col, isHighlighted, children }: SquareProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${row}-${col}`,
  });

  const isDark = (row + col) % 2 === 0;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative w-full aspect-square flex items-center justify-center transition-all duration-200',
        isDark ? 'bg-amber-700' : 'bg-amber-100',
        isOver && 'ring-4 ring-blue-500',
        isHighlighted && 'ring-4 ring-green-500 bg-green-200/50'
      )}
    >
      {children}
    </div>
  );
}

