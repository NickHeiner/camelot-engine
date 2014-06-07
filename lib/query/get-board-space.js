'use strict';

var _ = require('lodash');

function getBoardSpace(gameState, row, col) {
    return _.find(gameState.boardSpaces, {row: row, col: col});
}

module.exports = getBoardSpace;
