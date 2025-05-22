'use strict';

const getBoardSpace = require('../query/get-board-space'),
  util = require('util'),
  getCoordsBetween = require('../query/get-coords-between'),
  updateBoardSpace = require('./update-board-space'),
  _ = require('lodash');

function applyMove(gameState, moveStart, moveEnd) {
  let movingPiece = getBoardSpace(gameState, moveStart).piece,
    withMovingPieceNotAtSrc = updateBoardSpace(
      gameState,
      moveStart.row,
      moveStart.col,
      { piece: null }
    ),
    withMovingPieceAtDest = updateBoardSpace(
      withMovingPieceNotAtSrc,
      moveEnd.row,
      moveEnd.col,
      { piece: movingPiece }
    ),
    coordsBetween = getCoordsBetween(moveStart, moveEnd),
    nextGameState,
    spaceBetween;

  if (movingPiece === null) {
    throw new Error(
      `applyMove: there must be a piece to move at moveStart. moveStart is: \`${util.inspect(moveStart)}\``
    );
  }

  if (coordsBetween === null) {
    return withMovingPieceAtDest;
  }

  spaceBetween = getBoardSpace(gameState, coordsBetween.row, coordsBetween.col);

  if (!spaceBetween.piece) {
    throw new Error(
      'applyMove: if the move is a jump there must be a piece in the space between ' +
        `the start and end. That space between is: \`${util.inspect(spaceBetween)}\``
    );
  }

  if (spaceBetween.piece.player !== movingPiece.player) {
    nextGameState = _.merge({}, withMovingPieceAtDest, {
      capturedPieces: {
        [spaceBetween.piece.player]: {
          [spaceBetween.piece.type]:
            withMovingPieceAtDest.capturedPieces[spaceBetween.piece.player][
              spaceBetween.piece.type
            ] + 1,
        },
      },
    });
    return updateBoardSpace(nextGameState, spaceBetween.row, spaceBetween.col, {
      piece: null,
    });
  }

  return withMovingPieceAtDest;
}

module.exports = applyMove;
