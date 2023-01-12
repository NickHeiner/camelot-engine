
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export default function camelotEngine(): {
    createEmptyGame: (numPlayers: number) => GameState;
    query: (gameState: GameState) => {
        getCurrentPlayer: () => Player;
        getLegalMoves: () => MovePart[];
        getPieceAtSpace: (row: Row, col: Col) => Space;
    };
    update: (gameState: GameState, moveParts: MovePart[]) => GameState;
    constants: {
        numRows: number;
        numCols: number;
    };
} {
    return {
        createEmptyGame: require('./init/create-empty-game'),
        query: require('./query/query'),
        update: require('./update/update'),
        constants: require('./get-constants')
    };
}