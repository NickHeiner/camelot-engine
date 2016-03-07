'use strict';

var mori = require('mori'),
    getBoardSpace = require('../query/get-board-space');

function updateBoardSpace(gameState, row, col, newBoardSpace) {
    const origBoardSpace = getBoardSpace(gameState, row, col);
    return mori.assoc(gameState, 'boardSpaces',
        mori.reduce(
            (acc, el) => {
                const elToAdd = mori.equals(el, origBoardSpace) ? 
                    mori.reduce_kv(mori.assoc, el, newBoardSpace) :
                    el;
                return mori.cons(elToAdd, acc);
            }
        )
    );
}

module.exports = updateBoardSpace; 
