// Import and re-export types from Convex validators
import type {
  Player,
  GameStatus,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
} from '@/convex/convexTypes';

export type {
  Player,
  GameStatus,
  PieceType,
  Piece,
  BoardSpace,
  Coordinates,
  CapturedPieces,
};

export interface GameState {
  id: string;
  playerAId: string;
  playerBId: string;
  boardSpaces: BoardSpace[];
  currentPlayer: Player;
  turnCount: number;
  capturedPieces: CapturedPieces;
  winner?: Player;
  winReason?: string;
  status: GameStatus;
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
