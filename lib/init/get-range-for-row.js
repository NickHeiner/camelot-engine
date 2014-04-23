'use strict';

var mori = require('mori'),
    constants = require('../constants');

function getBoardSpace(row, col) {
    return mori.hash_map(
        'row', row,
        'col', col
    );
}

function getRangeForRow(row, firstCol) {
    var lastCol = mori.get(constants, 'BOARD_WIDTH') - firstCol;

    return mori.map(mori.partial(getBoardSpace, row), mori.range(firstCol, lastCol));
}

module.exports = getRangeForRow;
