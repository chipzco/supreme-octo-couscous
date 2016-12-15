"use strict";
var Coord = (function () {
    function Coord(x, y, color) {
        if (color === void 0) { color = ""; }
        this.x = x;
        this.y = y;
        this.color = color;
        this.currColor = "";
        if (x >= 0 && x < 26)
            this._algebraic_letter = String.fromCharCode(97 + x);
        else
            this._algebraic_letter = "";
        this._algebraic_num = y + 1;
        this.currColor = this.color;
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
var Board = (function () {
    function Board(_rows, _columns) {
        this._rows = _rows;
        this._columns = _columns;
        this._squares = new Array();
        var color = "";
        for (var x = 0; x < this._columns; x++) {
            for (var y = 0; y < this._rows; y++) {
                color = this.getSquareColor(x, y);
                this._squares.push(new Coord(x, y, color));
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
            return "black";
        else
            return "white";
    };
    Board.prototype.getSquare = function (x, y) {
        return this._squares.find(function (elem) { return elem.x == x && elem.y == y; });
    };
    Board.prototype.getAllSquares = function () {
        return this._squares;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=coord.js.map