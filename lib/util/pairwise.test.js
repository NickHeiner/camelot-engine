'use strict';

var expect = require('chai').expect,
    _ = require('lodash'),
    pairwise = require('./pairwise');

describe.only('pairwise', function() {

    it('returns an empty list for empty input', function() {
        expect(pairwise([])).to.deep.equal([]);
    });

    it('throw an error for a list of length = 1', function() {
        expect(_.partial(pairwise, [1])).to.throw(/Cannot create pairs from a list that only has one member/);
    });

    it('creates pairs for an input of even length', function() {
        expect(pairwise([1, 2, 3, 4])).to.deep.equal([[1, 2], [2, 3], [3, 4]]);
    });

    it('creates pairs for an input of odd length', function() {
        expect(pairwise([1, 2, 3])).to.deep.equal([[1, 2], [2, 3]]);
    });

});
