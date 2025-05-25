import type { Game } from './convexTypes';
import type { GameState, BoardSpace } from '../lib/engine/types';
export { getCurrentPlayer } from '../lib/game-utils';

export function boardSpacesToGameState(
  boardSpaces: Game['boardSpaces'],
  game: Game
): GameState {
  return {
    boardSpaces: boardSpaces as BoardSpace[],
    turnCount: game.turnCount,
    capturedPieces: game.capturedPieces,
  };
}
