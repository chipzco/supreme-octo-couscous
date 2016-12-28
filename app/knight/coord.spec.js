"use strict";
var _this = this;
var coord_1 = require("./coord");
describe('Test WHITE squares', function () {
    beforeEach(function () {
        this.testSquare = new coord_1.Square(3, 4, coord_1.sqColor.white);
    });
    it('should have right color property set', function () {
        expect(this.testSquare.getColor()).toBe('white');
    });
    it('should have right color for state set: ' + coord_1.sqStates.Selected + 'color: orange', function () {
        this.testSquare.currState = coord_1.sqStates.Selected;
        expect(this.testSquare.getColor()).toBe('orange');
    });
    var mycolor = 'blue';
    it('should have right color for state set ' + coord_1.sqStates.End + ' color: ' + mycolor, function () {
        this.testSquare.currState = coord_1.sqStates.End;
        expect(this.testSquare.getColor()).toBe(mycolor);
    });
    var mycolor2 = 'grey';
    it('should have right color for state set= ' + coord_1.sqStates.Path + ' color: ' + mycolor2, function () {
        this.testSquare.currState = coord_1.sqStates.Path;
        expect(this.testSquare.getColor()).toBe(mycolor2);
    });
    var mycolor3 = 'white';
    it('should have right color for state set= ' + coord_1.sqStates.None + ' color: ' + mycolor3, function () {
        this.testSquare.currState = coord_1.sqStates.None;
        expect(this.testSquare.getColor()).toBe(mycolor3);
    });
});
describe('Test BLACK squares', function () {
    beforeEach(function () {
        this.testSquare = new coord_1.Square(3, 4, coord_1.sqColor.black);
    });
    it('should have right color property set', function () {
        expect(this.testSquare.getColor()).toBe('black');
    });
    describe('testing colors through looping', function () {
        _this.testSquare = new coord_1.Square(3, 4, coord_1.sqColor.black);
        var _loop_1 = function (x) {
            var errorSet = false;
            var testSquareColor = '';
            try {
                _this.passThisState = coord_1.sqStates[x]; //this is actually the string- have not clue what this is...
                _this.testSquare.currState = x; //this is the number that must be set .
                testSquareColor = _this.testSquare.getColor();
            }
            catch (e) {
                errorSet = true;
            }
            it('Expect being able to SET pass state from Color index: ' + x, function () {
                expect(errorSet).toBe(false);
            });
            it('Expect pass this state to be string', function () {
                expect(this.passThisState).toBeNaN;
            });
            it('*** pass this STATE to be equal to what it set to...apparantly not! ', function () {
                expect(this.passThisState).toBe(coord_1.sqStates[x]);
            });
            it('Expect this.passThisState to be defined' + x, function () {
                expect(this.passThisState).toBeDefined;
            });
            it('expect this.testsquare to be dfined', function () {
                expect(this.testSquare.currState).toBeDefined;
            });
            it('expect the state to be set to what was passed in', function () {
                expect(this.testSquare.currState).toBe(this.passThisState);
            });
            it('expect this.testsquare to be of Right Color pertaining to index:  ' + x, function () {
                if (!errorSet) {
                    expect(testSquareColor).toBe(this.testSquare.colors[x]);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        };
        for (var x in _this.testSquare.colors) {
            _loop_1(x);
        }
    });
});
//# sourceMappingURL=coord.spec.js.map