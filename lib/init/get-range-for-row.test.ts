
import { expect } from 'chai';
import { getConstants } from '../get-constants';
import { getRangeForRow } from './get-range-for-row';
import { GameState, Player, MovePart, Row, Col, Space } from 'my-global-types';

describe('get-range-for-row', () => {

    it('should create a full row', () => {
        const constants = getConstants();
        expect(getRangeForRow(0, 0)).to.have.length(constants.BOARD_WIDTH);
    });

    it('should create a row with squares only in the middle', () => {
       expect(getRangeForRow(0, 5)).to.have.length(2);
    });

    it('should init the piece to null', () => {
       expect(getRangeForRow(0, 5)[0]).to.have.property('piece', null);
    });

});