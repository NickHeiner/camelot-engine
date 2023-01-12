
import { expect } from 'chai';
import _ from 'lodash';
import createBoardSpaces from './create-board-spaces';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('get-board-spaces', () => {

    it('should create 172 board spaces', () => {
        // TODO Is this the right number?
        expect(createBoardSpaces()).to.have.length(172);
    });

    it('should have 16 rows', () => {
        const generatedRows = _(createBoardSpaces())
                .pluck('row')
                .unique()
                .sortBy(_.identity)
                .valueOf();

        expect(generatedRows).to.deep.equal(_.range(17));
    });

});