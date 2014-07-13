'use strict';

var getBoardSpace = require('../query/get-board-space'),
    updateBoardSpace = require('./update-board-space');

function applyMove(gameState, moveStart, moveEnd) {
    var movingPiece = getBoardSpace(gameState, moveStart).piece,
        withMovingPieceNotAtSrc = updateBoardSpace(gameState, moveStart.row, moveStart.col, {piece: null}),
        withMovingPieceAtDest = updateBoardSpace(withMovingPieceNotAtSrc, moveEnd.row, moveEnd.col, {piece: movingPiece});

    return withMovingPieceAtDest;
}

module.exports = applyMove;
