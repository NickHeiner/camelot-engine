
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 17;
export const KNIGHT = 'knight';
export const PAWN = 'pawn';
export const PLAYER_A = 'playerA';
export const PLAYER_B = 'playerB';
export const COUNT_PIECES_NEEDED_TO_WIN = 2;
export const PLAYER_A_GOAL_ROW: Row = 0;
export const PLAYER_B_GOAL_ROW: Row = BOARD_HEIGHT - 1;
export const STARTING_POSITIONS: Array<{
  ROW: Row;
  COL_START: Col;
  COUNT_PAWNS: number;
  COLOR: Player;
}> = [
  {
    ROW: 5,
    COL_START: 2,
    COUNT_PAWNS: 6,
    COLOR: PLAYER_A
  },
  {
    ROW: 6,
    COL_START: 3,
    COUNT_PAWNS: 4,
    COLOR: PLAYER_A
  },
  {
    ROW: 9,
    COL_START: 3,
    COUNT_PAWNS: 4,
    COLOR: PLAYER_B
  },
  {
    ROW: 10,
    COL_START: 2,
    COUNT_PAWNS: 6,
    COLOR: PLAYER_B
  },
];