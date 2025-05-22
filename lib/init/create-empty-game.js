'use strict';

const createBoardSpaces = require('./create-board-spaces'),
  withStartingPieces = require('./with-starting-pieces'),
  constants = require('../get-constants')(),
  _ = require('lodash');

function createEmptyGame() {
  const capturedPieces = _([constants.PLAYER_A, constants.PLAYER_B])
    .map(function (playerName) {
      return [playerName, { [constants.PAWN]: 0, [constants.KNIGHT]: 0 }];
    })
    .zipObject()
    .valueOf();

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces(),
  });
}

module.exports = createEmptyGame;
