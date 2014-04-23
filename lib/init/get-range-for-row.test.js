'use strict';

var expect = require('chai').expect,
    constants = require('../constants'),
    mori = require('mori'),
    getRangeForRow = require('./get-range-for-row');

describe('get-range-for-row', function() {

    it('should create a full row', function() {
        expect(mori.count(getRangeForRow(0, 0))).to.equal(mori.get(constants, 'BOARD_WIDTH'));
    });

    it('should create a row with squares only in the middle', function() {
       expect(mori.count(getRangeForRow(0, 5))).to.equal(2);
    });

});
