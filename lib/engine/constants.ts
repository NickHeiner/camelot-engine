import type { Player, PieceType } from './types.js';

export const BOARD_WIDTH = 12 as const;
export const BOARD_HEIGHT = 17 as const;

export const KNIGHT = 'knight' as const satisfies PieceType;
export const PAWN = 'pawn' as const satisfies PieceType;

export const PLAYER_A = 'playerA' as const satisfies Player;
export const PLAYER_B = 'playerB' as const satisfies Player;

export const COUNT_PIECES_NEEDED_TO_WIN = 2 as const;

export const PLAYER_A_GOAL_ROW = 0 as const;
export const PLAYER_B_GOAL_ROW = BOARD_HEIGHT - 1;

export const STARTING_POSITIONS = [
  {
    ROW: 5,
    COL_START: 2,
    COUNT_PAWNS: 6,
    COLOR: PLAYER_A,
  },
  {
    ROW: 6,
    COL_START: 3,
    COUNT_PAWNS: 4,
    COLOR: PLAYER_A,
  },
  {
    ROW: 9,
    COL_START: 3,
    COUNT_PAWNS: 4,
    COLOR: PLAYER_B,
  },
  {
    ROW: 10,
    COL_START: 2,
    COUNT_PAWNS: 6,
    COLOR: PLAYER_B,
  },
] as const;
