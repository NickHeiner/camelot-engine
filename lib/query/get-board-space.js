'use strict';

var _ = require('lodash');

function getBoardSpace(gameState, rowOrBoardSpaceObj, colOrUndefined) {

    var row,
        col;

    if (_.isObject(rowOrBoardSpaceObj)) {
        row = rowOrBoardSpaceObj.row;
        col = rowOrBoardSpaceObj.col;
    } else {
        row = rowOrBoardSpaceObj;
        col = colOrUndefined;
    }

    return _.find(gameState.boardSpaces, {row: row, col: col}) || null;
}

module.exports = getBoardSpace;
