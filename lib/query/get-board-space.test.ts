
import { expect } from 'chai';
import getBoardSpace from './get-board-space';
import createEmptyGame from '../init/create-empty-game';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('get-board-space', () => {

    it('returns null for an invalid board space', () => {
        expect(getBoardSpace(createEmptyGame(), 10000, 20034)).to.equal(null);
    });

    it('allows a lookup by row and column', () => {
        expect(getBoardSpace(createEmptyGame(), 10, 4)).to.deep.equal({
            row: 10,
            col: 4,
            piece: {
                type: 'pawn',
                player: 'playerB'
            }
        });
    });

    it('allows a lookup by board space object', () => {
        expect(getBoardSpace(createEmptyGame(), {
            row: 9,
            col: 5
        })).to.deep.equal({
            row: 9,
            col: 5,
            piece: {
                type: 'pawn',
                player: 'playerB'
            }
        });
    });

});