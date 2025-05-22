'use strict';

const applyMove = require('./apply-move'),
  _ = require('lodash'),
  pairwise = require('../util/pairwise');

function applyMoves(gameState, moves) {

  // TODO it would be nice to throw an error if the moves aren't valid.

  let movePairs,
    nextGameState;

  if (moves.length === 1) {
    throw new Error('Cannot apply a single move: there must be both a source and a destination, and with a single move there is only a source');
  }

  nextGameState = _.merge({}, gameState, {
    turnCount: gameState.turnCount + 1
  });

  movePairs = pairwise(moves);

  return _.reduce(movePairs, function(gameStateAcc, movePair) {
    return applyMove(gameStateAcc, movePair[0], movePair[1]);
  }, nextGameState);

}

module.exports = applyMoves;
