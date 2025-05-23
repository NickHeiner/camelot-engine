import _ from 'lodash';
import getConstants from '../get-constants.js';
import type { BoardSpace } from '../types.js';

function createBoardSpace(row: number, col: number): BoardSpace {
  return {
    row,
    col,
    piece: null,
  };
}

function getRangeForRow(row: number, firstCol: number): BoardSpace[] {
  const lastCol = getConstants().BOARD_WIDTH - firstCol;
  return _.range(firstCol, lastCol).map((col: number) =>
    createBoardSpace(row, col)
  );
}

export default getRangeForRow;
