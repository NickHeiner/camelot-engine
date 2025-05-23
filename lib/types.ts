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

export interface StartingPosition {
  ROW: number;
  COL_START: number;
  COUNT_PAWNS: number;
  COLOR: Player;
}

export interface Constants {
  BOARD_WIDTH: number;
  BOARD_HEIGHT: number;
  KNIGHT: PieceType;
  PAWN: PieceType;
  PLAYER_A: Player;
  PLAYER_B: Player;
  COUNT_PIECES_NEEDED_TO_WIN: number;
  PLAYER_A_GOAL_ROW: number;
  PLAYER_B_GOAL_ROW: number;
  STARTING_POSITIONS: StartingPosition[];
}
