import { Doc } from './_generated/dataModel';
import type { GameState, BoardSpace } from '../lib/engine/types';
export { getCurrentPlayer } from '../lib/game-utils';

export function boardSpacesToGameState(
  boardSpaces: Doc<'games'>['boardSpaces'],
  game: Doc<'games'>
): GameState {
  return {
    boardSpaces: boardSpaces as BoardSpace[],
    turnCount: game.turnCount,
    capturedPieces: game.capturedPieces,
  };
}
