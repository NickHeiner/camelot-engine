'use strict';

var expect = require('chai').expect,
    pairwise = require('./pairwise');

describe('pairwise', function() {

    it('returns an empty list for empty input', function() {
        expect(pairwise([])).to.equal([]);
    });

    it('creates pairs for an input of even length', function() {
        expect(pairwise([1, 2, 3, 4])).to.equal([[1, 2], [2, 3], [3, 4]]);
    });

    it('creates pairs for an input of odd length', function() {
        expect(pairwise([1, 2, 3])).to.equal([[1, 2], [2, 3]]);
    });

});
