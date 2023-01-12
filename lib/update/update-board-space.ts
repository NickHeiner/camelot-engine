
import _ from 'lodash';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import getBoardSpace from '../query/get-board-space';

function updateBoardSpace(gameState: GameState, row: Row, col: Col, newBoardSpace: Space): GameState {
    const newGameState = _.cloneDeep(gameState);

    _.merge(getBoardSpace(newGameState, row, col), newBoardSpace);

    return newGameState;
}

export default updateBoardSpace;