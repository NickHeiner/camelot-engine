'use strict';

var getBoardSpaces = require('./get-board-spaces');

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
        pieceLocations: getBoardSpaces()
    }
}

module.exports = createEmptyGame;
