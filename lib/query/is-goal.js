import getBoardSpace from './get-board-space.js';
import _ from 'lodash';
import util from 'util';
import getAllBoardSpaces from './get-all-board-spaces.js';

export default function isGoal(gameState, row, col) {
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
        _(getAllBoardSpaces(gameState, row, col))
          .pluck('row')
          .max()
          .valueOf())
  );
}
