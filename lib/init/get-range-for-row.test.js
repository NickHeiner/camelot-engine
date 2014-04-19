'use strict';

var expect = require('chai').expect,
    constants = require('../get-constants')(),
    getRangeForRow = require('./get-range-for-row');

describe('get-range-for-row', function() {

    it('should create a full row', function() {
        expect(getRangeForRow(0, 0)).to.have.length(constants.BOARD_WIDTH);
    });

    it('should create a row with squares only in the middle', function() {
       expect(getRangeForRow(0, 5)).to.have.length(2);
    });

});
