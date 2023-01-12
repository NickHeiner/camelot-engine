
import { expect } from 'chai';
import getBoardSpace from '../query/get-board-space';
import createEmptyGame from './create-empty-game';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('create-empty-game', () => {

    it('should have a board space at 10, 3', () => {
        expect(getBoardSpace(createEmptyGame(), 10, 3)).to.deep.equal({
            row: 10,
            col: 3,
            piece: {
                type: 'pawn',
                player: 'playerB'
            }
        } as Space);
    });

    it('should not have a board space at 0, 0', () => {
        expect(getBoardSpace(createEmptyGame(), 0, 0)).to.equal(null);
    });

    it('should start with turnCount = 0', () => {
        expect(createEmptyGame()).to.have.property('turnCount', 0);
    });

    it('should include a captured pieces record', () => {
        expect(createEmptyGame()).to.have.property('capturedPieces').that.deep.equals({
            playerA: {
                pawn: 0,
                knight: 0
            },
            playerB: {
                pawn: 0,
                knight: 0
            }
        } as Record<Player, Record<MovePart, number>>);
    });

});