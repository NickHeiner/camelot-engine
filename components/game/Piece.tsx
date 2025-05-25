'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import type { Piece as PieceType } from '@/lib/engine/types';

interface PieceProps {
  piece: PieceType;
  position: { row: number; col: number };
  isSelected: boolean;
  onSelect: () => void;
}

const pieceSymbols = {
  knight: {
    playerA: '♘',
    playerB: '♞',
  },
  pawn: {
    playerA: '♙',
    playerB: '♟',
  },
};

export function Piece({ piece, position, isSelected, onSelect }: PieceProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `piece-${position.row}-${position.col}`,
      data: {
        piece,
        position,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const symbol = pieceSymbols[piece.type][piece.player];
  const isWhite = piece.player === 'playerA';

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onSelect}
      className={cn(
        'text-5xl cursor-move transition-all duration-200 hover:scale-110',
        isWhite
          ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
          : 'text-black',
        isDragging && 'opacity-50 scale-125',
        isSelected && 'scale-110 drop-shadow-[0_0_12px_rgba(0,255,0,0.8)]'
      )}
    >
      {symbol}
    </button>
  );
}

