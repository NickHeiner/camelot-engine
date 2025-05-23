import getConstants from '../get-constants.js';

const { JUMP_DISTANCE } = getConstants();

export default function getCoordsBetween(space1, space2) {
  const moveDelta = {
    row: space2.row - space1.row,
    col: space2.col - space1.col,
  };
  const offset = {
    row: 0,
    col: 0,
  };
  const isJump =
    Math.abs(moveDelta.row) === JUMP_DISTANCE ||
    Math.abs(moveDelta.col) === JUMP_DISTANCE;

  if (!isJump) {
    return null;
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
