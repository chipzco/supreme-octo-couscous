"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (sqStates) {
    sqStates[sqStates["None"] = 0] = "None";
    sqStates[sqStates["Start"] = 1] = "Start";
    sqStates[sqStates["End"] = 2] = "End";
    sqStates[sqStates["Path"] = 3] = "Path";
    sqStates[sqStates["Selected"] = 4] = "Selected";
})(exports.sqStates || (exports.sqStates = {}));
var sqStates = exports.sqStates;
(function (sqColor) {
    sqColor[sqColor["white"] = 0] = "white";
    sqColor[sqColor["black"] = 1] = "black";
})(exports.sqColor || (exports.sqColor = {}));
var sqColor = exports.sqColor;
var Coord = (function () {
    function Coord(x, y) {
        this.x = x;
        this.y = y;
        if (x >= 0 && x < 26)
            this._algebraic_letter = String.fromCharCode(97 + x);
        else
            this._algebraic_letter = "";
        this._algebraic_num = y + 1;
    }
    Object.defineProperty(Coord.prototype, "alg_not", {
        get: function () {
            return this._algebraic_letter + this._algebraic_num.toString();
        },
        enumerable: true,
        configurable: true
    });
    return Coord;
}());
exports.Coord = Coord;
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(x, y, sqcolor) {
        _super.call(this, x, y);
        this.x = x;
        this.y = y;
        this.sqcolor = sqcolor;
        this.colors = ['whiteorblack', 'green', 'blue', 'grey', 'orange'];
        this._currState = sqStates.None;
    }
    Square.prototype.getColor = function () {
        var color = "";
        if (this._currState == sqStates.None)
            color = sqColor[this.sqcolor];
        else
            color = this.colors[this._currState];
        return color;
    };
    Object.defineProperty(Square.prototype, "currState", {
        set: function (newstate) { this._currState = newstate; },
        enumerable: true,
        configurable: true
    });
    return Square;
}(Coord));
exports.Square = Square;
var Board = (function () {
    function Board(_rows, _columns) {
        this._rows = _rows;
        this._columns = _columns;
        this._squares = new Array();
        var color;
        for (var x = 0; x < this._columns; x++) {
            for (var y = 0; y < this._rows; y++) {
                color = this.getSquareColor(x, y);
                this._squares.push(new Square(x, y, color));
            }
        }
    }
    Object.defineProperty(Board.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Board.prototype.getSquareColor = function (x, y) {
        if ((x % 2 == 0 && y % 2 == 0) || (x % 2 > 0 && y % 2 > 0))
            return sqColor.black;
        else
            return sqColor.white;
    };
    Board.prototype.getSquare = function (x, y) {
        return this._squares.find(function (elem) { return elem.x == x && elem.y == y; });
    };
    Board.prototype.getAllSquares = function () {
        return this._squares;
    };
    Board.prototype.clearBoardState = function (skip) {
        if (skip === void 0) { skip = null; }
        this._squares.forEach(function (sq) {
            if (!(skip && skip.length > 0 && skip.findIndex(function (v) { return v.x == sq.x && v.y == sq.y; }) > -1))
                sq.currState = sqStates.None;
        });
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=coord.js.map