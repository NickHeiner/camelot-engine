import getBoardSpace from './get-board-space.js';
import getAllBoardSpaces from './get-all-board-spaces.js';
import type { GameState } from '../types.js';

export default function isGoal(
  gameState: GameState,
  row: number,
  col: number
): boolean {
  if (
    !gameState ||
    typeof gameState !== 'object' ||
    !('boardSpaces' in gameState)
  ) {
    throw new Error(
      `isGoal: gameState must be an object representing the game state, but was: ${JSON.stringify(
        gameState
      )}`
    );
  }

  return (
    getBoardSpace(gameState, row, col) !== undefined &&
    (row === 0 ||
      row ===
        Math.max(...getAllBoardSpaces(gameState).map((space) => space.row)))
  );
}
