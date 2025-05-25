import _ from 'lodash';
import type { GameState, BoardSpace, Coordinates } from '../types';

function getBoardSpace(
  gameState: GameState,
  row: number,
  col: number
): BoardSpace | null;
function getBoardSpace(
  gameState: GameState,
  coordinates: Coordinates | BoardSpace
): BoardSpace | null;
function getBoardSpace(
  gameState: GameState,
  rowOrCoordinates: number | Coordinates | BoardSpace,
  col?: number
): BoardSpace | null {
  let targetRow: number;
  let targetCol: number;

  if (typeof rowOrCoordinates === 'number') {
    if (col === undefined) {
      throw new Error('Column must be provided when row is a number');
    }
    targetRow = rowOrCoordinates;
    targetCol = col;
  } else {
    targetRow = rowOrCoordinates.row;
    targetCol = rowOrCoordinates.col;
  }

  return (
    _.find(gameState.boardSpaces, { row: targetRow, col: targetCol }) || null
  );
}

export default getBoardSpace;
