'use strict';

var createBoardSpaces = require('./create-board-spaces'),
    withStartingPieces = require('./with-starting-pieces'),
    constants = require('../get-constants')(),
    _ = require('lodash');

function createEmptyGame() {

    var capturedPieces = _([constants.PLAYER_A, constants.PLAYER_B])
            .map(function(playerName) {
                return [
                    playerName,
                    { [constants.PAWN]: 0, [constants.KNIGHT]: 0 }
                ];
            })
            .zipObject()
            .valueOf();

    return withStartingPieces({
        turnCount: 0,
        capturedPieces: capturedPieces,
        boardSpaces: createBoardSpaces()
    });
}

module.exports = createEmptyGame;
