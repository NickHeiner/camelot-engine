'use strict';

var WHITE = 'white',
    BLACK = 'black';

function getConstants() {
    return {
        BOARD_WIDTH: 12,
        BOARD_HEIGHT: 16,
        KNIGHT: 'knight',
        PAWN: 'pawn',
        WHITE: WHITE,
        BLACK: BLACK,

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
