'use strict';

var updateBoardSpace = require('../update/update-board-space'),
    constants = require('../get-constants')(),
    repeat = require('../util/repeat'),
    _ = require('lodash');

function makePieceRow(gameState, countPawns, row, colStart) {

    var pieces = [constants.KNIGHT].concat(repeat(constants.PAWN, countPawns)).concat([constants.KNIGHT]),
        colIndices = _.range(colStart, countPawns + 2);

    return _.reduce(colIndices, function(gameStateAcc, colIndex) {
        return updateBoardSpace(gameStateAcc, row, colIndex, pieces[colIndex]);
    }, gameState);

}

function withStartingPieces(gameState) {

    return _.reduce(constants.STARTING_POSITIONS, function(gameStateAcc, startingPosition) {
        return makePieceRow(gameStateAcc, startingPosition.COUNT_PAWNS, startingPosition.ROW, startingPosition.COL_START);
    }, gameState);

}

module.exports = withStartingPieces;
