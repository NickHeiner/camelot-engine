'use strict';

var getBoardSpace = require('../query/get-board-space'),
    getSpaceBetween = require('../query/get-space-between'),
    updateBoardSpace = require('./update-board-space');

function applyMove(gameState, moveStart, moveEnd) {
    var movingPiece = getBoardSpace(gameState, moveStart).piece,
        withMovingPieceNotAtSrc = updateBoardSpace(gameState, moveStart.row, moveStart.col, {piece: null}),
        withMovingPieceAtDest = updateBoardSpace(withMovingPieceNotAtSrc, moveEnd.row, moveEnd.col, {piece: movingPiece}),
        spaceBetween = getSpaceBetween(moveStart, moveEnd);

    // TODO This moves the piece but not the color. `piece` should probably be an object instead of two fields.

    if (spaceBetween === null) {
        return withMovingPieceAtDest;
    }

    return updateBoardSpace(withMovingPieceAtDest, spaceBetween.row, spaceBetween.col, {piece: null});
}

module.exports = applyMove;
