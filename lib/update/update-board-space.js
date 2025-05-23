import _ from 'lodash';
import getBoardSpace from '../query/get-board-space.js';

export default function updateBoardSpace(gameState, row, col, newBoardSpace) {
  const newGameState = _.cloneDeep(gameState);

  _.merge(getBoardSpace(newGameState, row, col), newBoardSpace);

  return newGameState;
}
