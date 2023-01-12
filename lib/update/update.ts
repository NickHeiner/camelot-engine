
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export function update() {
    return {
        applyMoves: require('./apply-moves')
    };
}