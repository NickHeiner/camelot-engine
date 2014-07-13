'use strict';

function getConstants() {
    var WHITE = 'white',
        BLACK = 'black',
        BOARD_HEIGHT = 16;

    return {
        BOARD_WIDTH: 12,
        BOARD_HEIGHT: BOARD_HEIGHT,
        KNIGHT: 'knight',
        PAWN: 'pawn',
        WHITE: WHITE,
        BLACK: BLACK,

        COUNT_PIECES_NEEDED_TO_WIN: 2,

        WHITE_GOAL_ROW: 0,
        BLACK_GOAL_ROW: BOARD_HEIGHT - 1,

        // This could be de-duplicated
        STARTING_POSITIONS: [
            {
                ROW: 5,
                COL_START: 3,
                COUNT_PAWNS: 6,
                COLOR: WHITE
            },
            {
                ROW: 6,
                COL_START: 4,
                COUNT_PAWNS: 4,
                COLOR: WHITE
            },
            {
                ROW: 9,
                COL_START: 4,
                COUNT_PAWNS: 4,
                COLOR: BLACK
            },
            {
                ROW: 10,
                COL_START: 3,
                COUNT_PAWNS: 6,
                COLOR: BLACK
            },
        ]
    };
}

module.exports = getConstants;
