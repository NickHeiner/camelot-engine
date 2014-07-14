'use strict';

var _ = require('lodash'),
    getAllBoardSpaces = require('./get-all-board-spaces'),
    constants = require('../get-constants')();

function getGameWinner(gameState) {
    function hasEnoughPieces(color) {
        return _.filter(getAllBoardSpaces(gameState), {color: color}).length > constants.COUNT_PIECES_NEEDED_TO_WIN;
    }

    function isRowFilled(row) {
        var piecesInRow = _.filter(getAllBoardSpaces(gameState), {row: row});
        return piecesInRow.length === _.filter(piecesInRow, 'piece').length;
    }

    if (!hasEnoughPieces(constants.WHITE) || isRowFilled(constants.WHITE_GOAL_ROW)) {
        return constants.BLACK;
    } else if (!hasEnoughPieces(constants.BLACK) || isRowFilled(constants.BLACK_GOAL_ROW)) {
        return constants.WHITE;
    }

    return null;
}

module.exports = getGameWinner;
