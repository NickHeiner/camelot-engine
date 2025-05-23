import _ from 'lodash';

function getBoardSpace(gameState, rowOrBoardSpaceObj, colOrUndefined) {
  let row, col;

  if (_.isObject(rowOrBoardSpaceObj)) {
    row = rowOrBoardSpaceObj.row;
    col = rowOrBoardSpaceObj.col;
  } else {
    row = rowOrBoardSpaceObj;
    col = colOrUndefined;
  }

  return _.find(gameState.boardSpaces, { row, col }) || null;
}

export default getBoardSpace;
