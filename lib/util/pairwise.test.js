'use strict';

var _ = require('lodash'),
    pairwise = require('./pairwise');

describe('pairwise', function() {

    it('returns an empty list for empty input', function() {
        expect(pairwise([])).toEqual([]);
    });

    it('throw an error for a list of length = 1', function() {
        expect(_.partial(pairwise, [1])).toThrow(/Cannot create pairs from a list that only has one member/);
    });

    it('creates pairs for an input of even length', function() {
        expect(pairwise([1, 2, 3, 4])).toEqual([[1, 2], [2, 3], [3, 4]]);
    });

    it('creates pairs for an input of odd length', function() {
        expect(pairwise([1, 2, 3])).toEqual([[1, 2], [2, 3]]);
    });

});
