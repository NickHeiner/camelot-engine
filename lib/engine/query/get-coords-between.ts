import type { Coordinates, BoardSpace } from '../types.js';

const JUMP_DISTANCE = 2;

function getCoordsBetween(
  space1: Coordinates | BoardSpace,
  space2: Coordinates | BoardSpace
): Coordinates | undefined {
  const moveDelta: Coordinates = {
    row: space2.row - space1.row,
    col: space2.col - space1.col,
  };
  const isJump =
    Math.abs(moveDelta.row) === JUMP_DISTANCE ||
    Math.abs(moveDelta.col) === JUMP_DISTANCE;
  const offset: Coordinates = {
    row: 0,
    col: 0,
  };

  if (!isJump) {
    return undefined;
  }

  if (moveDelta.col === -JUMP_DISTANCE) {
    offset.col = -1;
  } else if (moveDelta.col === JUMP_DISTANCE) {
    offset.col = 1;
  }

  if (moveDelta.row === -JUMP_DISTANCE) {
    offset.row = -1;
  } else if (moveDelta.row === JUMP_DISTANCE) {
    offset.row = 1;
  }

  return {
    row: space1.row + offset.row,
    col: space1.col + offset.col,
  };
}

export default getCoordsBetween;
