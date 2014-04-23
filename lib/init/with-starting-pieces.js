'use strict';

var updateBoardSpace = require('../update/update-board-space'),
    constants = require('../get-constants')(),
    mori = require('mori'),
    _ = require('lodash');

function append(moriList, elem) {
    return mori.reverse(mori.conj(mori.reverse(moriList), elem));
}

function makePieceRow(gameState, countPawns, row, colStart) {

    var pawns = mori.repeat(countPawns, constants.PAWN),
        pieces = append(mori.conj(pawns, constants.KNIGHT), constants.KNIGHT),
        colIndices = _.range(colStart, colStart + mori.count(pieces));

    return _.reduce(colIndices, function(gameStateAcc, colIndex, pieceIndex) {
        return updateBoardSpace(gameStateAcc, row, colIndex, {piece: mori.nth(pieces, pieceIndex)});
    }, gameState);

}

function withStartingPieces(gameState) {

    return _.reduce(constants.STARTING_POSITIONS, function(gameStateAcc, startingPosition) {
        return makePieceRow(gameStateAcc, startingPosition.COUNT_PAWNS, startingPosition.ROW, startingPosition.COL_START);
    }, gameState);

}

module.exports = withStartingPieces;
