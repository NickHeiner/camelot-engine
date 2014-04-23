'use strict';

var mori = require('mori'),
    getBoardSpace = require('../query/get-board-space');

function merge(map1, map2) {
    return mori.reduce_kv(mori.assoc, map1, map2);
}

function updateBoardSpace(gameState, row, col, newBoardSpace) {

    var origBoardSpace = getBoardSpace(gameState, row, col);

    return mori.assoc(gameState, 'boardSpaces',

        mori.pipeline(
            mori.get(gameState, 'boardSpaces'),
            mori.partial(mori.remove, function(boardSpace) {
                return boardSpace.row === row && boardSpace.col === col;
            }),
            function(boardSpacesWithoutUpdatedOne) {
                return mori.conj(boardSpacesWithoutUpdatedOne, merge(origBoardSpace, newBoardSpace));
            }
        )

    );

}

module.exports = updateBoardSpace; 
