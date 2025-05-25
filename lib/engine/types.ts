import type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
} from '../shared-types.js';

export type {
  Player,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
};

export interface GameState {
  boardSpaces: BoardSpace[];
  turnCount: number;
  capturedPieces: CapturedPieces;
}
