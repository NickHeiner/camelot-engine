import type { GameState, BoardSpace } from '../types.js';

/**
 * Extracts the board spaces array from the game state
 */
export default function getBoardSpacesArray(
  gameState: GameState
): BoardSpace[] {
  return gameState.boardSpaces;
}
