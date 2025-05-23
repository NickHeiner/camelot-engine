import _ from 'lodash';
import type { GameState, BoardSpace, Coordinates } from '../types.js';

function getBoardSpace(
  gameState: GameState,
  rowOrBoardSpaceObj: number | Coordinates | BoardSpace,
  colOrUndefined?: number
): BoardSpace | null {
  let row: number, col: number;

  if (_.isObject(rowOrBoardSpaceObj)) {
    row = (rowOrBoardSpaceObj as Coordinates | BoardSpace).row;
    col = (rowOrBoardSpaceObj as Coordinates | BoardSpace).col;
  } else {
    row = rowOrBoardSpaceObj;
    col = colOrUndefined!;
  }

  return _.find(gameState.boardSpaces, { row, col }) || null;
}

export default getBoardSpace;
