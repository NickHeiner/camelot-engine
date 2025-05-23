export type PieceType = 'knight' | 'pawn';
export type Player = 'playerA' | 'playerB';

export interface Piece {
  type: PieceType;
  player: Player;
}

export interface BoardSpace {
  row: number;
  col: number;
  piece: Piece | null;
}

export type CapturedPieces = Record<Player, Record<PieceType, number>>;

export interface GameState {
  boardSpaces: BoardSpace[];
  turnCount: number;
  capturedPieces: CapturedPieces;
}

export interface Coordinates {
  row: number;
  col: number;
}
