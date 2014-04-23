'use strict';

var mori = require('mori');

module.exports = mori.js_to_clj({
    BOARD_WIDTH: 12,
    BOARD_HEIGHT: 16,
    KNIGHT: 'knight',
    PAWN: 'pawn',

    // This could be de-duplicated
    STARTING_POSITIONS: [
        {
            ROW: 5,
            COL_START: 3,
            COUNT_PAWNS: 6
        },
        {
            ROW: 6,
            COL_START: 4,
            COUNT_PAWNS: 4
        },
        {
            ROW: 9,
            COL_START: 4,
            COUNT_PAWNS: 4
        },
        {
            ROW: 10,
            COL_START: 3,
            COUNT_PAWNS: 6
        },
    ]
});
