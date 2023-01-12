
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

export default function update() {
  return {
    applyMoves(gameState: GameState, moves: MovePart[], player: Player): GameState {
      // ...
    }
  };
}