'use strict';

var _ = require('lodash'),
    getConstants = require('../get-constants');

function createBoardSpace(row, col) {
    return {
        row: row,
        col: col,
        piece: null
    };
}

function getRangeForRow(row, firstCol) {
    var lastCol = getConstants().BOARD_WIDTH - firstCol;
    return _.map(_.range(firstCol, lastCol), function(col) {
        return createBoardSpace(row, col);
    });
}

module.exports = getRangeForRow;
