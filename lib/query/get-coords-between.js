export default function getCoordsBetween(space1, space2) {
  const moveDelta = {
    row: space2.row - space1.row,
    col: space2.col - space1.col,
  };
  const isJump = Math.abs(moveDelta.row) === 2 || Math.abs(moveDelta.col) === 2;
  const offset = {
    row: 0,
    col: 0,
  };

  if (!isJump) {
    return null;
  }

  if (moveDelta.col === -2) {
    offset.col = -1;
  } else if (moveDelta.col === 2) {
    offset.col = 1;
  }

  if (moveDelta.row === -2) {
    offset.row = -1;
  } else if (moveDelta.row === 2) {
    offset.row = 1;
  }

  return {
    row: space1.row + offset.row,
    col: space1.col + offset.col,
  };
}
