
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import _ from 'lodash';
import getConstants from '../get-constants';

function createBoardSpace(row: Row, col: Col): Space {
    return {
        row,
        col,
        piece: null
    };
}

function getRangeForRow(row: Row, firstCol: Col): Space[] {
    const lastCol = getConstants().BOARD_WIDTH - firstCol;
    return _.map(_.range(firstCol, lastCol), (col: Col) => {
        return createBoardSpace(row, col);
    });
}

export default getRangeForRow;