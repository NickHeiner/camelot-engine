
import { expect } from 'chai';
import _ from 'lodash';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

import newObj from './new-obj';

describe('newObj', () => {

    it('returns a new object', () => {
        expect(newObj('foo', 3)).to.deep.equal({foo: 3});
    });

});