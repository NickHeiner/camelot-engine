import _ from 'lodash';
import { BOARD_WIDTH } from '../constants';
import type { BoardSpace } from '../types';

function createBoardSpace(row: number, col: number): BoardSpace {
  return {
    row,
    col,
    piece: null,
  };
}

function getRangeForRow(row: number, firstCol: number): BoardSpace[] {
  const lastCol = BOARD_WIDTH - firstCol;
  return _.range(firstCol, lastCol).map((col: number) =>
    createBoardSpace(row, col)
  );
}

export default getRangeForRow;
