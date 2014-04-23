'use strict';

var _ = require('lodash'),
    mori = require('mori');

function getBoardSpace(gameState, row, col) {

    return mori.pipeline(
        mori.get(gameState, 'boardSpaces'),
        mori.partial(mori.filter, function(boardSpace) {
            return boardSpace.row === row && boardSpace.col === col;
        }),
        mori.first
    );

}

module.exports = getBoardSpace;
