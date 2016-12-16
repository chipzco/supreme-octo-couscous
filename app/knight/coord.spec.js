"use strict";
var coord_1 = require('./coord');
describe('Test squares', function () {
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
//# sourceMappingURL=coord.spec.js.map