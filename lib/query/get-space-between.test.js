'use strict';

var expect = require('chai').expect,
    getSpaceBetween = require('./get-space-between');

describe('get-space-between', function() {

    describe('returns null when the spaces are adjacent', function() {
        it('same row', function() {
            expect(getSpaceBetween({
                row: 4,
                col: 8
            }, {
                row: 4,
                col: 9
            })).to.equal(null);
        });

        it('same col', function() {
            expect(getSpaceBetween({
                row: 4,
                col: 9
            }, {
                row: 5,
                col: 9
            })).to.equal(null);
        });

        it('different row and col', function() {
            expect(getSpaceBetween({
                row: 4,
                col: 9
            }, {
                row: 5,
                col: 8
            })).to.equal(null);
        });
    });

    it('same col', function() {
        expect(getSpaceBetween({
            row: 4,
            col: 8
        }, {
            row: 6,
            col: 8
        })).to.deep.equal({
            row: 5,
            col: 8
        });
    });

    it('same row', function() {
        expect(getSpaceBetween({
            row: 4,
            col: 8
        }, {
            row: 4,
            col: 10
        })).to.deep.equal({
            row: 4,
            col: 9
        });
    });

    it('same row lower col', function() {
        expect(getSpaceBetween({
            row: 4,
            col: 8
        }, {
            row: 4,
            col: 6
        })).to.deep.equal({
            row: 4,
            col: 7
        });
    });

});
