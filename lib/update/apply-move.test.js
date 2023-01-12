
import { expect } from 'chai';
import createEmptyGame from '../init/create-empty-game';
import updateBoardSpace from '../update/update-board-space';
import getBoardSpace from '../query/get-board-space';
import constants from '../get-constants';
import applyMove from './apply-move';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('apply-move', () => {

    it('adds a piece to the destination', () => {
        const game: GameState = createEmptyGame();
        const dest: MovePart = {
            row: 11,
            col: 4
        };
        const withMove: GameState = applyMove(game, {
            row: 10,
            col: 4
        }, dest);

        expect(getBoardSpace(withMove, dest).piece).to.have.property('type', constants.PAWN);
    });

    it('removes a piece from the source', () => {
        const game: GameState = createEmptyGame();
        const src: MovePart = {
            row: 10,
            col: 4
        };
        const withMove: GameState = applyMove(game, src, {
            row: 11,
            col: 4
        });

        expect(getBoardSpace(withMove, src).piece).to.equal(null);
    });

    it('removes a jumped piece', () => {
        const game: GameState = createEmptyGame();
        const withPieceToJump: GameState = updateBoardSpace(game, 11, 4, {piece: {type: constants.PAWN, player: 'playerA'}});
        const src: MovePart = {
            row: 10,
            col: 4
        };

        const withMove: GameState = applyMove(withPieceToJump, src, {
                row: 12,
                col: 4
            });

        expect(getBoardSpace(withMove, 11, 4).piece).to.equal(null);
    });

    it('should not remove a jumped piece if it is friendly', () => {
        const game: GameState = createEmptyGame();
        const withPieceToJump: GameState = updateBoardSpace(game, 11, 4, {piece: {type: constants.PAWN, player: 'playerB'}});
        const src: MovePart = {
            row: 10,
            col: 4
        };
        const withMove: GameState = applyMove(withPieceToJump, src, {
            row: 12,
            col: 4
        });

        expect(getBoardSpace(withMove, 11, 4).piece).to.deep.equal(getBoardSpace(withPieceToJump, 11, 4).piece);
    });

    describe('errors', () => {

        it('throws an error when there is no piece to jump', () => {
            const game: GameState = createEmptyGame();
            const src: MovePart = {
                row: 10,
                col: 4
            };

            expect(() => {
                applyMove(game, src, {
                    row: 12,
                    col: 4
                });
            }).to.throw(/if the move is a jump there must be a piece in the space between/);
        });

        it('throws an error when there is no piece at start', () => {
            const game: GameState = createEmptyGame();
            const src: MovePart = {
                row: 12,
                col: 4
            };

            expect(() => {
                applyMove(game, src, {
                    row: 12,
                    col: 5
                });
            }).to.throw(/there must be a piece to move at moveStart/);    
        });

    });

});