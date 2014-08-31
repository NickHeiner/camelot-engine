'use strict';

var getBoardSpace = require('../query/get-board-space'),
    util = require('util'),
    getCoordsBetween = require('../query/get-coords-between'),
    updateBoardSpace = require('./update-board-space');

function applyMove(gameState, moveStart, moveEnd) {
    var movingPiece = getBoardSpace(gameState, moveStart).piece,
        withMovingPieceNotAtSrc = updateBoardSpace(gameState, moveStart.row, moveStart.col, {piece: null}),
        withMovingPieceAtDest = updateBoardSpace(withMovingPieceNotAtSrc, moveEnd.row, moveEnd.col, {piece: movingPiece}),
        coordsBetween = getCoordsBetween(moveStart, moveEnd),
        spaceBetween = getBoardSpace(gameState, coordsBetween.row, coordsBetween.col);

    if (movingPiece === null) {
        throw new Error('applyMove: there must be a piece to move at moveStart. moveStart is: `' + util.inspect(moveStart) + '`');
    }

    if (spaceBetween === null) {
        return withMovingPieceAtDest;
    }

    if (!spaceBetween.piece) {
        throw new Error('applyMove: if the move is a jump there must be a piece in the space between ' +
            'the start and end. That spaceBetween between is: `' + util.inspect(spaceBetween) + '`');    
    }

    if (spaceBetween.piece.player !== movingPiece.player) {
        return updateBoardSpace(withMovingPieceAtDest, spaceBetween.row, spaceBetween.col, {piece: null});
    }

    return withMovingPieceAtDest;

}

module.exports = applyMove;
