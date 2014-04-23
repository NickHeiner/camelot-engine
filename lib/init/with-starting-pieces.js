'use strict';

var updateBoardSpace = require('../update/update-board-space'),
    constants = require('../constants'),
    mori = require('mori'),
    _ = require('lodash');

function append(moriList, elem) {
    return mori.reverse(mori.conj(mori.reverse(moriList), elem));
}

function withPieceRow(gameState, countPawns, row, colStart) {

    var pawns = mori.repeat(countPawns, mori.get(constants, 'PAWN')),
        pieces = append(mori.conj(pawns, mori.get(constants, 'KNIGHT')), mori.get(constants, 'KNIGHT')),
        colIndices = mori.clj_to_js(mori.range(colStart, colStart + mori.count(pieces)));

    return _.reduce(colIndices, function(gameStateAcc, colIndex, pieceIndex) {
        return updateBoardSpace(gameStateAcc, row, colIndex, mori.hash_map('piece', mori.nth(pieces, pieceIndex)));
    }, gameState);

}

function withStartingPieces(gameState) {

    return mori.pipeline(
        mori.get(constants, 'STARTING_POSITIONS'),
        mori.partial(mori.reduce, function(gameStateAcc, startingPosition) {

            return withPieceRow(
                gameStateAcc,
                mori.get(startingPosition, 'COUNT_PAWNS'),
                mori.get(startingPosition, 'ROW'),
                mori.get(startingPosition, 'COL_START')
            );

        }, gameState)
    );

}

module.exports = withStartingPieces;
