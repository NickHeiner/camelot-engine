
import { expect } from 'chai';
import updateBoardSpace from './update-board-space';
import { createEmptyGame, query } from '../..';

describe('updateBoardSpace', () => {

    it('updates a board space', () => {
        const game = createEmptyGame();
        const piece = {type: 'pawn', player: 'playerB'};
        const withPiece = updateBoardSpace(game, 11, 4, {piece});

        expect(query.getBoardSpace(withPiece, 11, 4).piece).to.deep.equal(piece); 
    });

});