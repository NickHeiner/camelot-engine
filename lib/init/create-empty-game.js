'use strict';

var createBoardSpaces = require('./create-board-spaces'),
    constants = require('../constants'),
    mori = require('mori'),
    withStartingPieces = require('./with-starting-pieces');

function createEmptyGame() {

    var emptyPlayer = mori.hash_map(
        mori.get(constants, 'PAWN'), 0,
        mori.get(constants, 'KNIGHT'), 0
    );

    return withStartingPieces(mori.js_to_clj({
        turnCount: 0,
        capturedPieces: {
            playerA: emptyPlayer,
            playerB: emptyPlayer
        },
        boardSpaces: createBoardSpaces()
    }));
}

module.exports = createEmptyGame;
