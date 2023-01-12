
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import getBoardSpace from './get-board-space';
import * as _ from 'lodash';
import { getAllBoardSpaces } from './get-all-board-spaces';

export default function isGoal(gameState: GameState, row: Row, col: Col): boolean {
  if (!_.isObject(gameState)) {
    throw new Error(
      `isGoal: gameState must be an object representing the game state, but was: \`${JSON.stringify(
        gameState
      )}\``
    );
  }

  return (
    getBoardSpace(gameState, row, col) !== null &&
    (row === 0 ||
      row === _(getAllBoardSpaces(gameState, row, col)).pluck('row').max().valueOf())
  );
}