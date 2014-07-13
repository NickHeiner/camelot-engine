'use strict';

var applyMove = require('../update/apply-move'),
    getBoardSpace = require('./get-board-space'),
    _ = require('lodash');

function isValidMove(gameState, moveParts) {
    if (moveParts.length <= 1) {
        return true;
    }

    function isBoardSpaceValid(boardSpace) {
        return !_.isUndefined(getBoardSpace(gameState, boardSpace));
    }

    if (!isBoardSpaceValid(moveParts[0]) || !isBoardSpaceValid(moveParts[1])) {
        return false;
    }

    var gameAfterFirstMove = applyMove(gameState, moveParts[0], moveParts[1]);
    return isValidMove(gameAfterFirstMove, _.rest(moveParts));
}

module.exports = isValidMove;
