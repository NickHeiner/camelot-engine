'use strict';

const _ = require('lodash'),
  getBoardSpace = require('../query/get-board-space');

function updateBoardSpace(gameState, row, col, newBoardSpace) {
  const newGameState = _.cloneDeep(gameState);

  _.merge(getBoardSpace(newGameState, row, col), newBoardSpace);

  return newGameState;
}

module.exports = updateBoardSpace;
