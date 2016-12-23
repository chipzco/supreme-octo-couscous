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
var TicTac = (function () {
    function TicTac() {
        this.winSqColor = coord_1.sqColor.white;
    }
    TicTac.prototype.ngOnInit = function () {
        this.pathSquares = [];
        this.toPlayX = true;
        this.winner = null;
    };
    TicTac.prototype.holdWinSqRef = function (sq) {
        this.winSq = sq;
    };
    TicTac.prototype.checkWinner = function () {
        var winExists = false;
        var compstate;
        for (var _i = 0, _a = this.board.colGen; _i < _a.length; _i++) {
            var x = _a[_i];
            if (winExists)
                break;
            for (var _b = 0, _c = this.board.rowGen; _b < _c.length; _b++) {
                var y = _c[_b];
                //console.log("x: " + x + " y " + y);
                var sqR = this.board.getSquare(x, y);
                if (sqR) {
                    if (y == this.board.rows - 1)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState)
                        break;
                    if (y == 0 && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
                else
                    console.log("no square");
            }
        }
        if (!winExists) {
            for (var _d = 0, _e = this.board.rowGen; _d < _e.length; _d++) {
                var y = _e[_d];
                if (winExists)
                    break;
                for (var _f = 0, _g = this.board.colGen; _f < _g.length; _f++) {
                    var x = _g[_f];
                    //console.log("x: " + x + " y " + y);
                    var sqR = this.board.getSquare(x, y);
                    if (sqR) {
                        if (x == 0)
                            compstate = sqR.currState;
                        if (compstate != sqR.currState)
                            break;
                        if (x == (this.board.columns - 1) && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                            winExists = true;
                            this.winner = compstate;
                            break;
                        }
                    }
                    else
                        console.log("no square");
                }
            }
        }
        return winExists;
    };
    TicTac.prototype.setBoard = function (boardobj) {
        this.board = boardobj;
        // console.log(boardobj);
    };
    TicTac.prototype.handleSquareClick = function (clickedsq) {
        //this.board.clearBoardState();
        if (this.winner) {
            console.log("GAME OVER");
            return;
        }
        var isAlreadyClicked = false;
        if (this.pathSquares && this.pathSquares.length && this.pathSquares.findIndex(function (sq) { return sq.x == clickedsq.x && sq.y == clickedsq.y; }) > -1)
            isAlreadyClicked = true;
        if (isAlreadyClicked)
            return;
        if (this.toPlayX)
            clickedsq.currState = coord_1.sqStates.Start;
        else
            clickedsq.currState = coord_1.sqStates.End;
        this.pathSquares.push(clickedsq);
        this.toPlayX = !this.toPlayX;
        var iswinner = this.checkWinner();
        if (iswinner) {
            this.winSq.currState = this.winner;
            console.log("WINNER FOUND");
            return;
        }
    };
    TicTac = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'tictac',
            templateUrl: './tictac.component.html',
            styleUrls: ['tictac.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TicTac);
    return TicTac;
}());
exports.TicTac = TicTac;
//# sourceMappingURL=tictac.js.map