
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';
import applyMove from './apply-move';
import _ from 'lodash';
import pairwise from '../util/pairwise';

export default function applyMoves(gameState: GameState, moves: MovePart[]): GameState {
  if (moves.length === 1) {
    throw new Error('Cannot apply a single move: there must be both a source and a destination, and with a single move there is only a source');
  }

  const nextGameState: GameState = _.merge({}, gameState, {
    turnCount: gameState.turnCount + 1
  });

  const movePairs = pairwise(moves);

  return _.reduce(movePairs, (gameStateAcc: GameState, movePair: [MovePart, MovePart]) => {
    return applyMove(gameStateAcc, movePair[0], movePair[1]);
  }, nextGameState);
}