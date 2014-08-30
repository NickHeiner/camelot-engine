'use strict';

var updateBoardSpace = require('../update/update-board-space'),
    constants = require('../get-constants')(),
    repeat = require('../util/repeat'),
    _ = require('lodash');

function makePieceRow(gameState, countPawns, row, colStart, player) {

    var pieces = [constants.KNIGHT].concat(repeat(constants.PAWN, countPawns)).concat([constants.KNIGHT]),
        collOffsets = _.range(countPawns + 2);

    return _.reduce(collOffsets, function(gameStateAcc, colOffset) {
        return updateBoardSpace(gameStateAcc, row, colOffset + colStart, {
            piece: {
                type: pieces[colOffset],
                player: player
            }
        });
    }, gameState);

}

function withStartingPieces(gameState) {

    return _.reduce(constants.STARTING_POSITIONS, function(gameStateAcc, startingPosition) {
        return makePieceRow(
            gameStateAcc,
            startingPosition.COUNT_PAWNS,
            startingPosition.ROW,
            startingPosition.COL_START,
            startingPosition.COLOR
        );
    }, gameState);

}

module.exports = withStartingPieces;
