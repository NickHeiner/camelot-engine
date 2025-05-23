export default function getConstants() {
  const BOARD_HEIGHT = 17,
    PLAYER_A = 'playerA',
    PLAYER_B = 'playerB',
    JUMP_DISTANCE = 2;

  return {
    BOARD_WIDTH: 12,
    BOARD_HEIGHT,
    JUMP_DISTANCE,
    KNIGHT: 'knight',
    PAWN: 'pawn',

    PLAYER_A,
    PLAYER_B,

    COUNT_PIECES_NEEDED_TO_WIN: 2,

    PLAYER_A_GOAL_ROW: 0,
    PLAYER_B_GOAL_ROW: BOARD_HEIGHT - 1,

    // This could be de-duplicated
    STARTING_POSITIONS: [
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
    ],
  };
}
