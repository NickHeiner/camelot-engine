import type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
} from '../shared-types.js';

export type { Player, PieceType, Piece, BoardSpace, Coordinates };

export type CapturedPieces = Record<Player, Record<PieceType, number>>;

export interface GameState {
  boardSpaces: BoardSpace[];
  turnCount: number;
  capturedPieces: CapturedPieces;
}
