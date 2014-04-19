'use strict';

var _ = require('lodash'),
    getConstants = require('../get-constants');

function getBoardSpace(row, col) {
    return {
        row: row,
        col: col
    };
}

function getRangeForRow(firstCol, row) {
    var lastCol = getConstants().BOARD_WIDTH - firstCol;
    return _.map(_.range(firstCol, lastCol + 1), function(col) {
        return getBoardSpace(row, col);
    });
}

function getBoardSpaces() {

    return _.flatten([
        getRangeForRow(0, 5),
        getRangeForRow(1, 2),
        getRangeForRow(2, 1),
        _.range(4, 13).map(function(row) {
            return getRangeForRow(row, 0);
        }),
        getRangeForRow(14, 1),
        getRangeForRow(15, 2),
        getRangeForRow(16, 5),
    ]);
    
}

module.exports = getBoardSpaces;
