import getBoardSpace from '../query/get-board-space.js';

function updateBoardSpace(gameState, row, col, newBoardSpace) {
  const newGameState = structuredClone(gameState);

  Object.assign(getBoardSpace(newGameState, row, col), newBoardSpace);

  return newGameState;
}

export default updateBoardSpace;
