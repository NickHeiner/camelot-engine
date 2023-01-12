
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function getAllBoardSpaces(gameState: GameState): Space[] {
    return gameState.boardSpaces;
}