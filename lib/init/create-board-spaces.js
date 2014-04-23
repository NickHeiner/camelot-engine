'use strict';

var mori = require('mori'),
    getRangeForRow = require('./get-range-for-row');

function getBoardSpaces() {

    return mori.flatten(
        mori.list(
            getRangeForRow(0, 5),
            getRangeForRow(1, 2),
            getRangeForRow(2, 1),
            mori.map(function(row) {
                return getRangeForRow(row, 0);
            }, mori.range(4, 14)),
            getRangeForRow(14, 1),
            getRangeForRow(15, 2),
            getRangeForRow(16, 5)
        )
    );

}

module.exports = getBoardSpaces;
