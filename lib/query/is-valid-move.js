'use strict';

var applyMove = require('../update/apply-move'),
    getBoardSpace = require('./get-board-space'),
    getSpaceBetween = require('./get-space-between'),
    _ = require('lodash');

function isValidMove(gameState, moveParts) {

    var firstBoardSpace,
        moveDelta,
        spaceBetween,
        gameAfterFirstMove;

    if (moveParts.length <= 1) {
        return true;
    }

    firstBoardSpace = getBoardSpace(gameState, moveParts[0]);

    if (firstBoardSpace === null ||
        getBoardSpace(gameState, moveParts[1]) === null ||
        !firstBoardSpace.piece
    ) {
        return false;
    }

    moveDelta = {
        row: moveParts[1].row - moveParts[0].row,
        col: moveParts[1].col - moveParts[0].cow
    };

    if (Math.abs(moveDelta.row) > 2 || Math.abs(moveDelta.col) > 2) {
        return false;
    }

    spaceBetween = getSpaceBetween(moveParts[0], moveParts[1]);

    gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMove(gameAfterFirstMove, _.rest(moveParts));
}

module.exports = isValidMove;
