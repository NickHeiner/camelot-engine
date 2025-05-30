import getBoardSpace from '../query/get-board-space.js';
import type { GameState, BoardSpace } from '../types.js';

function updateBoardSpace(
  gameState: GameState,
  row: number,
  col: number,
  newBoardSpace: Partial<BoardSpace>
): GameState {
  const newGameState = structuredClone(gameState);
  const boardSpace = getBoardSpace(newGameState, row, col);

  if (!boardSpace) {
    throw new Error(
      `updateBoardSpace: invalid coordinates row=${row}, col=${col}`
    );
  }

  Object.assign(boardSpace, newBoardSpace);

  return newGameState;
}

export default updateBoardSpace;
