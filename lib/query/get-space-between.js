'use strict';

function getSpaceBetween(space1, space2) {

    var moveDelta = {
            row: space2.row - space1.row,
            col: space2.col - space1.col
        },
        isJump,
        offset;

    isJump = moveDelta.row === 2 || moveDelta.col === 2;

    if (!isJump) {
        return null;
    }

    offset = {
        row: 0,
        col: 0
    };

    if (moveDelta.col === -2) {
        offset.col = -1;
    } else if (moveDelta.col === 2) {
        offset.col = 1;
    }

    if (moveDelta.row === -2) {
        offset.row = -1;
    } else if (moveDelta.row === 2) {
        offset.row = 1;
    }

    return {
        row: space1.row + offset.row,
        col: space1.col + offset.col
    };
}

module.exports = getSpaceBetween;
