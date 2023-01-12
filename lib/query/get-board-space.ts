
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function getBoardSpace(gameState: GameState, rowOrBoardSpaceObj: Row | Space, colOrUndefined?: Col): Space | null {
    let row: Row;
    let col: Col;

    if (typeof rowOrBoardSpaceObj === 'object') {
        row = rowOrBoardSpaceObj.row;
        col = rowOrBoardSpaceObj.col;
    } else {
        row = rowOrBoardSpaceObj;
        col = colOrUndefined;
    }

    return gameState.boardSpaces.find(space => space.row === row && space.col === col) || null;
}