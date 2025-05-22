'use strict';

var getCoordsBetween = require('./get-coords-between');

describe('get-coords-between', function() {

    describe('returns null when the spaces are adjacent', function() {
        it('same row', function() {
            expect(getCoordsBetween({
                row: 4,
                col: 8
            }, {
                row: 4,
                col: 9
            })).toBe(null);
        });

        it('same col', function() {
            expect(getCoordsBetween({
                row: 4,
                col: 9
            }, {
                row: 5,
                col: 9
            })).toBe(null);
        });

        it('different row and col', function() {
            expect(getCoordsBetween({
                row: 4,
                col: 9
            }, {
                row: 5,
                col: 8
            })).toBe(null);
        });
    });

    it('same col', function() {
        expect(getCoordsBetween({
            row: 4,
            col: 8
        }, {
            row: 6,
            col: 8
        })).toEqual({
            row: 5,
            col: 8
        });
    });

    it('same row', function() {
        expect(getCoordsBetween({
            row: 4,
            col: 8
        }, {
            row: 4,
            col: 10
        })).toEqual({
            row: 4,
            col: 9
        });
    });

    it('same row lower col', function() {
        expect(getCoordsBetween({
            row: 4,
            col: 8
        }, {
            row: 4,
            col: 6
        })).toEqual({
            row: 4,
            col: 7
        });
    });

    it('same col lower row', function() {
        expect(getCoordsBetween({
            row: 4,
            col: 8
        }, {
            row: 2,
            col: 8
        })).toEqual({
            row: 3,
            col: 8
        });
    });

    it('both row and col higher', function() {
        expect(getCoordsBetween({
            row: 4,
            col: 8
        }, {
            row: 6,
            col: 10
        })).toEqual({
            row: 5,
            col: 9
        });
    });

});
