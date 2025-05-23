import getBoardSpace from './get-board-space.js';
import _ from 'lodash';
import util from 'util';
import getAllBoardSpaces from './get-all-board-spaces.js';
import type { GameState } from '../types.js';

export default function isGoal(
  gameState: GameState,
  row: number,
  col: number
): boolean {
  if (!_.isObject(gameState)) {
    throw new Error(
      `isGoal: gameState must be an object representing the game state, but was: \`${util.inspect(
        gameState
      )}\``
    );
  }

  return (
    getBoardSpace(gameState, row, col) !== null &&
    (row === 0 ||
      row ===
        Math.max(...getAllBoardSpaces(gameState).map((space) => space.row)))
  );
}
