'use strict';

var _ = require('lodash'),
    getConstants = require('../get-constants');

function getBoardSpace(row, col) {
    return {
        row: row,
        col: col
    };
}

function getRangeForRow(row, firstCol) {
    var lastCol = getConstants().BOARD_WIDTH - firstCol;
    return _.map(_.range(firstCol, lastCol), function(col) {
        return getBoardSpace(row, col);
    });
}

module.exports = getRangeForRow;
