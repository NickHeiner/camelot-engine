export type Player = 'playerA' | 'playerB';

export type PieceType = 'knight' | 'pawn';

export interface Piece {
  type: PieceType;
  player: Player;
}

export interface BoardSpace {
  row: number;
  col: number;
  piece?: Piece | null;
}

export interface Coordinates {
  row: number;
  col: number;
}

export interface GameState {
  id: string;
  playerAId: string;
  playerBId: string;
  boardSpaces: BoardSpace[];
  currentPlayer: Player;
  turnCount: number;
  capturedPieces: {
    playerA: { knights: number; pawns: number };
    playerB: { knights: number; pawns: number };
  };
  winner?: Player;
  winReason?: string;
  status: 'waiting' | 'active' | 'completed';
  createdAt: number;
  updatedAt: number;
}

export interface Move {
  id: string;
  gameId: string;
  playerId: string;
  from: Coordinates;
  to: Coordinates;
  moveNumber: number;
  timestamp: number;
}

