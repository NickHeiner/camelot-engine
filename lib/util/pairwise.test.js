
import { expect } from 'chai';
import _ from 'lodash';
import pairwise from './pairwise';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('pairwise', () => {

    it('returns an empty list for empty input', () => {
        expect(pairwise([])).to.deep.equal([]);
    });

    it('throw an error for a list of length = 1', () => {
        expect(_.partial(pairwise, [1])).to.throw(/Cannot create pairs from a list that only has one member/);
    });

    it('creates pairs for an input of even length', () => {
        expect(pairwise([1, 2, 3, 4])).to.deep.equal([[1, 2], [2, 3], [3, 4]]);
    });

    it('creates pairs for an input of odd length', () => {
        expect(pairwise([1, 2, 3])).to.deep.equal([[1, 2], [2, 3]]);
    });

});