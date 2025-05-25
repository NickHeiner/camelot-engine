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

// Define the minimal game state shape that engine functions need
export interface GameState {
  boardSpaces: BoardSpace[];
  turnCount: number;
  capturedPieces: CapturedPieces;
}
