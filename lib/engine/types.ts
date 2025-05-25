import type {
  Player,
  PieceType,
  Piece,
  BoardSpace as SharedBoardSpace,
  Coordinates,
} from '../shared-types.js';

export type { Player, PieceType, Piece, Coordinates };

export interface BoardSpace extends SharedBoardSpace {
  piece: Piece | null;
}

export type CapturedPieces = Record<Player, Record<PieceType, number>>;

export interface GameState {
  boardSpaces: BoardSpace[];
  turnCount: number;
  capturedPieces: CapturedPieces;
}
