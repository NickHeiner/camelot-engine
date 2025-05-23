import _ from 'lodash';
import getConstants from '../get-constants.js';

function createBoardSpace(row, col) {
  return {
    row,
    col,
    piece: null,
  };
}

const getRangeForRow = (row, firstCol) => {
  const lastCol = getConstants().BOARD_WIDTH - firstCol;
  return _.range(firstCol, lastCol).map((col) => createBoardSpace(row, col));
};

export default getRangeForRow;
