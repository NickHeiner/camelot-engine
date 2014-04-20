'use strict';

var createBoardSpaces = require('./create-board-spaces');

function createEmptyGame() {
    return {
        turnCount: 0,
        capturedPieces: {
            playerA: {
                small: 0,
                large: 0
            },
            playerB: {
                small: 0,
                large: 0
            }
        },
        boardSpaces: createBoardSpaces()
    };
}

module.exports = createEmptyGame;
