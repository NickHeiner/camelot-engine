'use strict';

var _ = require('lodash'),
    getRangeForRow = require('./get-range-for-row');

function getBoardSpaces() {

    // TODO verify that this is actually correct

    return _.flatten([
        getRangeForRow(0, 5),
        getRangeForRow(1, 2),
        getRangeForRow(2, 1),
        _.range(3, 14).map(function(row) {
            return getRangeForRow(row, 0);
        }),
        getRangeForRow(14, 1),
        getRangeForRow(15, 2),
        getRangeForRow(16, 5),
    ]);

}

module.exports = getBoardSpaces;
