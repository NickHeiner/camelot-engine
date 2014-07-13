'use strict';

var applyMove = require('../update/apply-move'),
    getBoardSpace = require('./get-board-space'),
    _ = require('lodash');

function isValidMove(gameState, moveParts) {

    var firstBoardSpace;

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

    var gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMove(gameAfterFirstMove, _.rest(moveParts));
}

module.exports = isValidMove;
