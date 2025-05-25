import { v } from 'convex/values';
import type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
} from '../lib/shared-types';

// Convex validators for shared types
export const playerValidator = v.union(
  v.literal('playerA'),
  v.literal('playerB')
);
export const pieceTypeValidator = v.union(
  v.literal('knight'),
  v.literal('pawn')
);

export const pieceValidator = v.object({
  type: pieceTypeValidator,
  player: playerValidator,
});

export const coordinatesValidator = v.object({
  row: v.number(),
  col: v.number(),
});

export const boardSpaceValidator = v.object({
  row: v.number(),
  col: v.number(),
  piece: v.optional(pieceValidator),
});

export const capturedPiecesValidator = v.object({
  playerA: v.object({
    knight: v.number(),
    pawn: v.number(),
  }),
  playerB: v.object({
    knight: v.number(),
    pawn: v.number(),
  }),
});

// Re-export the types for convenience
export type { Player, PieceType, Piece, BoardSpace, Coordinates };
