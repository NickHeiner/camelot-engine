import createBoardSpaces from './create-board-spaces';
import withStartingPieces from './with-starting-pieces';
import { PLAYER_A, PLAYER_B, PAWN, KNIGHT } from '../constants';
import type { CapturedPieces, GameState } from '../types';

function createEmptyGame(): GameState {
  const capturedPieces: CapturedPieces = {
    [PLAYER_A]: { [PAWN]: 0, [KNIGHT]: 0 },
    [PLAYER_B]: { [PAWN]: 0, [KNIGHT]: 0 },
  };

  return withStartingPieces({
    turnCount: 0,
    capturedPieces,
    boardSpaces: createBoardSpaces(),
  });
}

export default createEmptyGame;
