import _ from 'lodash';
import getAllBoardSpaces from './get-all-board-spaces';
import {
  PLAYER_A,
  PLAYER_B,
  PLAYER_A_GOAL_ROW,
  PLAYER_B_GOAL_ROW,
  COUNT_PIECES_NEEDED_TO_WIN,
} from '../constants';
import type { GameState, Player, BoardSpace } from '../types';

function getGameWinner(gameState: GameState): Player | null {
  function hasEnoughPieces(player: Player): boolean {
    return (
      _.filter(getAllBoardSpaces(gameState), function (boardPiece: BoardSpace) {
        return boardPiece.piece?.player === player;
      }).length > COUNT_PIECES_NEEDED_TO_WIN
    );
  }

  function isRowFilled(row: number): boolean {
    if (!_.isNumber(row)) {
      throw new Error(
        `isRowFilled: row must be a number, but was: ${typeof row}`
      );
    }

    const piecesInRow = _.filter(getAllBoardSpaces(gameState), { row });
    return piecesInRow.length === _.filter(piecesInRow, 'piece').length;
  }

  if (!hasEnoughPieces(PLAYER_A) || isRowFilled(PLAYER_A_GOAL_ROW)) {
    return PLAYER_B;
  } else if (!hasEnoughPieces(PLAYER_B) || isRowFilled(PLAYER_B_GOAL_ROW)) {
    return PLAYER_A;
  }

  return null;
}

export default getGameWinner;
