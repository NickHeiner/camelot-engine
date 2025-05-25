import { v, Infer } from 'convex/values';

// Convex validators for shared types
export const playerValidator = v.union(
  v.literal('playerA'),
  v.literal('playerB')
);

export const gameStatusValidator = v.union(
  v.literal('waiting'),
  v.literal('playing'),
  v.literal('completed')
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

// Infer types from validators
export type Player = Infer<typeof playerValidator>;
export type GameStatus = Infer<typeof gameStatusValidator>;
export type PieceType = Infer<typeof pieceTypeValidator>;
export type Piece = Infer<typeof pieceValidator>;
export type Coordinates = Infer<typeof coordinatesValidator>;
export type BoardSpace = Infer<typeof boardSpaceValidator>;
export type CapturedPieces = Infer<typeof capturedPiecesValidator>;

// For convenience, re-export the Convex document types
import type { Doc } from './_generated/dataModel';
export type Game = Doc<'games'>;
export type Move = Doc<'moves'>;
