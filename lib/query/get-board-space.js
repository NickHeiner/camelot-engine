const getBoardSpace = (gameState, rowOrBoardSpaceObj, colOrUndefined) => {
  let row, col;

  if (typeof rowOrBoardSpaceObj === 'object' && rowOrBoardSpaceObj !== null) {
    row = rowOrBoardSpaceObj.row;
    col = rowOrBoardSpaceObj.col;
  } else {
    row = rowOrBoardSpaceObj;
    col = colOrUndefined;
  }

  return (
    gameState.boardSpaces.find(
      (space) => space.row === row && space.col === col
    ) || null
  );
};

export default getBoardSpace;
