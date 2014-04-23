'use strict';

var mori = require('mori'),
    getBoardSpace = require('../query/get-board-space');

function merge(map1, map2) {
    return mori.reduce_kv(mori.assoc, map1, map2);
}

function updateBoardSpace(gameState, row, col, newBoardSpace) {

    function queryBoardSpaces(queryFnName) {
        return mori.pipeline(
            'boardSpaces',
            mori.partial(mori.get, gameState),
            mori.partial(mori[queryFnName], function(boardSpace) {
                return boardSpace.row === row && boardSpace.col === col;
            }),
            mori.first
        );
    }

    var origBoardSpace = mori.pipeline(
            'filter',
            queryBoardSpaces,
            mori.first
        );

    return mori.assoc(gameState, 'boardSpaces',

        mori.pipeline(
            'remove',
            queryBoardSpaces,
            mori.partial(mori.conj, merge(origBoardSpace, newBoardSpace))
        )

    );

}

module.exports = updateBoardSpace; 
