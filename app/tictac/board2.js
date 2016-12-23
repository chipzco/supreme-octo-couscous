"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var coord_1 = require('../knight/coord');
var Board2 = (function () {
    function Board2() {
        this.eventBoardref = new core_1.EventEmitter();
        this.eventClickedSquare = new core_1.EventEmitter();
    }
    Object.defineProperty(Board2.prototype, "rowGen", {
        get: function () {
            return this.boardInfo.rowGen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Board2.prototype, "colGen", {
        get: function () {
            return this.boardInfo.colGen;
        },
        enumerable: true,
        configurable: true
    });
    Board2.prototype.ngOnInit = function () {
        this.numsquares = this._rows * this._columns;
        this.boardInfo = new coord_1.Board(this._rows, this._columns);
        this._squares = new Array();
        this.eventBoardref.emit(this.boardInfo);
    };
    Board2.prototype.holdSqRef = function (sqref) {
        //console.log(" Holding ref to the sq info: " + sqref.alg_not);
        this._squares.push(sqref); //setting the square ref in array in parent (board) from the drawn square. how else to hold squares?
        if (this._squares.length == this.numsquares)
            this.boardInfo.setAllSquares(this._squares);
        //sqref.currState = sqStates.Start;
    };
    Board2.prototype.passclickedSq = function (clicksqRef) {
        this.eventClickedSquare.emit(clicksqRef);
        //console.log("passsing square");
    };
    Board2.prototype.getSquareColor = function (x, y) {
        if ((x % 2 == 0 && y % 2 == 0) || (x % 2 > 0 && y % 2 > 0))
            return coord_1.sqColor.black;
        else
            return coord_1.sqColor.white;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Board2.prototype, "_rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Board2.prototype, "_columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Board2.prototype, "colorArr", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Board2.prototype, "eventBoardref", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Board2.prototype, "eventClickedSquare", void 0);
    Board2 = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'board',
            templateUrl: 'board.component.html',
            styleUrls: ['tictac.css']
        }), 
        __metadata('design:paramtypes', [])
    ], Board2);
    return Board2;
}());
exports.Board2 = Board2;
//# sourceMappingURL=board2.js.map