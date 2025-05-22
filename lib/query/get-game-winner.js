'use strict';

const _ = require('lodash'),
  getAllBoardSpaces = require('./get-all-board-spaces'),
  util = require('util'),
  constants = require('../get-constants')();

function getGameWinner(gameState) {
  function hasEnoughPieces(player) {
    return (
      _.filter(getAllBoardSpaces(gameState), function (boardPiece) {
        return boardPiece.piece && boardPiece.piece.player === player;
      }).length > constants.COUNT_PIECES_NEEDED_TO_WIN
    );
  }

  function isRowFilled(row) {
    if (!_.isNumber(row)) {
      throw new Error(
        `isRowFilled: row must be a number, but was: \`${util.inspect(row)}\``
      );
    }

    const piecesInRow = _.filter(getAllBoardSpaces(gameState), { row });
    return piecesInRow.length === _.filter(piecesInRow, 'piece').length;
  }

  if (
    !hasEnoughPieces(constants.PLAYER_A) ||
    isRowFilled(constants.PLAYER_A_GOAL_ROW)
  ) {
    return constants.PLAYER_B;
  } else if (
    !hasEnoughPieces(constants.PLAYER_B) ||
    isRowFilled(constants.PLAYER_B_GOAL_ROW)
  ) {
    return constants.PLAYER_A;
  }

  return null;
}

module.exports = getGameWinner;
