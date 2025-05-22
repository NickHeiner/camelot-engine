'use strict';

const _ = require('lodash'),
  getConstants = require('../get-constants');

function createBoardSpace(row, col) {
  return {
    row,
    col,
    piece: null,
  };
}

function getRangeForRow(row, firstCol) {
  const lastCol = getConstants().BOARD_WIDTH - firstCol;
  return _.map(_.range(firstCol, lastCol), function (col) {
    return createBoardSpace(row, col);
  });
}

module.exports = getRangeForRow;
