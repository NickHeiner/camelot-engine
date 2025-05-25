import { GameState, BoardSpace } from '../types';

const getAllBoardSpaces = (gameState: GameState): BoardSpace[] =>
  gameState.boardSpaces;

export default getAllBoardSpaces;
