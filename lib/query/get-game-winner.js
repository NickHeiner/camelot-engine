'use strict';

var _ = require('lodash'),
    constants = require('../get-constants')();

function getGameWinner(gameState) {
    function hasEnoughPieces(color) {
        return (_.filter(gameState.boardSpaces, {color: color}) || []).length > constants.COUNT_PIECES_NEEDED_TO_WIN;
    }

    if (!hasEnoughPieces(constants.WHITE)) {
        return constants.BLACK;
    } else if (!hasEnoughPieces(constants.BLACK)) {
        return constants.WHITE;
    }

    return null;
}

module.exports = getGameWinner;
