'use strict';

var getBoardSpace = require('./get-board-space'),
    _ = require('lodash'),
    getAllBoardSpaces = require('./get-all-board-spaces');

function isGoal(gameState, row, col) {
    return getBoardSpace(gameState, row, col) !== null && 
        (row === 0 || row === _(getAllBoardSpaces(gameState, row, col)).pluck('row').max());
}

module.exports = isGoal;
