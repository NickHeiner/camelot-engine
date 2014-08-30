'use strict';

var _ = require('lodash'),
    getAllBoardSpaces = require('./get-all-board-spaces'),
    constants = require('../get-constants')();

function getGameWinner(gameState) {
    function hasEnoughPieces(player) {
        return _.filter(getAllBoardSpaces(gameState), {player: player}).length > constants.COUNT_PIECES_NEEDED_TO_WIN;
    }

    function isRowFilled(row) {
        var piecesInRow = _.filter(getAllBoardSpaces(gameState), {row: row});
        return piecesInRow.length === _.filter(piecesInRow, 'piece').length;
    }

    if (!hasEnoughPieces(constants.PLAYER_A) || isRowFilled(constants.PLAYER_A_GOAL_ROW)) {
        return constants.PLAYER_B;
    } else if (!hasEnoughPieces(constants.PLAYER_B) || isRowFilled(constants.PLAYER_B)) {
        return constants.PLAYER_A;
    }

    return null;
}

module.exports = getGameWinner;
