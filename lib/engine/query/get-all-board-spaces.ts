import { GameState, BoardSpace } from '../types.js';

const getAllBoardSpaces = (gameState: GameState): BoardSpace[] =>
  gameState.boardSpaces;

export default getAllBoardSpaces;
