'use strict';

const getBoardSpace = require('./get-board-space'),
  _ = require('lodash'),
  util = require('util'),
  getAllBoardSpaces = require('./get-all-board-spaces');

function isGoal(gameState, row, col) {
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

module.exports = isGoal;
