'use strict';

var mori = require('mori');

function getBoardSpace(gameState, row, col) {

    return mori.pipeline(
        mori.get(gameState, 'boardSpaces'),
        mori.partial(mori.filter, function(boardSpace) {
            return mori.get(boardSpace, 'row') === row && mori.get(boardSpace, 'col') === col;
        }),
        mori.first
    );

}

module.exports = getBoardSpace;
