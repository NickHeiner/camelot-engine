import type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
} from '../shared-types.js';
import type { Game } from '@/convex/convexTypes';

export type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
};

// GameState is the subset of Game fields that engine functions need
export type GameState = Pick<
  Game,
  'boardSpaces' | 'turnCount' | 'capturedPieces'
>;
