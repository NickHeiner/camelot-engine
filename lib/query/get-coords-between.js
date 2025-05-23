const getCoordsBetween = (space1, space2) => {
  let moveDelta = {
      row: space2.row - space1.row,
      col: space2.col - space1.col,
    },
    isJump,
    offset;

  isJump = Math.abs(moveDelta.row) === 2 || Math.abs(moveDelta.col) === 2;

  if (!isJump) {
    return null;
  }

  offset = {
    row: 0,
    col: 0,
  };

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
};

export default getCoordsBetween;
