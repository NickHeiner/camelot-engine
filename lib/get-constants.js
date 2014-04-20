'use strict';

function getConstants() {
    return {
        BOARD_WIDTH: 12,
        BOARD_HEIGHT: 16,
        KNIGHT: 'knight',
        PAWN: 'pawn',

        // This could be de-duplicated
        STARTING_POSITIONS: [
            {
                ROW: 5,
                COL_START: 4,
                COUNT_PAWNS: 6
            },
            {
                ROW: 6,
                COL_START: 5,
                COUNT_PAWNS: 4
            },
            {
                ROW: 9,
                COL_START: 5,
                COUNT_PAWNS: 5
            },
            {
                ROW: 10,
                COL_START: 4,
                COUNT_PAWNS: 6
            },
        ]
    };
}

module.exports = getConstants;
