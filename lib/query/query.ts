
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export default function query(): {
    isGoal: (gameState: GameState) => boolean;
    isValidMove: (gameState: GameState, moveParts: MovePart[]) => boolean;
    getGameWinner: (gameState: GameState) => Player | null;
    getBoardSpace: (gameState: GameState, row: Row, col: Col) => Space;
    getAllBoardSpaces: (gameState: GameState) => Space[][];
    getCoordsBetween: (startRow: Row, startCol: Col, endRow: Row, endCol: Col) => [Row, Col][];
} {
    return {
        isGoal: require('./is-goal'),
        isValidMove: require('./is-valid-move'),
        getGameWinner: require('./get-game-winner'),
        getBoardSpace: require('./get-board-space'),
        getAllBoardSpaces: require('./get-all-board-spaces'),
        getCoordsBetween: require('./get-coords-between'),
    };
}