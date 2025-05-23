import _ from 'lodash';
import getConstants from '../get-constants.js';

function createBoardSpace(row, col) {
  return {
    row,
    col,
    piece: null,
  };
}

export default function getRangeForRow(row, firstCol) {
  const lastCol = getConstants().BOARD_WIDTH - firstCol;
  return _.map(_.range(firstCol, lastCol), function (col) {
    return createBoardSpace(row, col);
  });
}
