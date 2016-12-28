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
var core_1 = require("@angular/core");
var coord_1 = require("../knight/coord");
var board2_1 = require("./board2");
var TicTac = (function () {
    function TicTac() {
        this.winSqColor = coord_1.sqColor.white;
        this.colorArr = ['white_black', 'glyphicon glyphicon-remove', 'glyphicon glyphicon-adjust', 'grey', 'orange'];
    }
    TicTac.prototype.ngOnInit = function () {
        this.pathSquares = [];
        this.toPlayX = true;
        this.winner = null;
        this.draw = false;
        this.inHistory = false;
        this.winPath = [];
    };
    TicTac.prototype.ngAfterViewInit = function () {
        this.board = this.board2.boardInfo;
    };
    TicTac.prototype.holdWinSqRef = function (sq) {
        this.winSq = sq;
        //console.log(sq);
    };
    TicTac.prototype.checkWinner = function () {
        var winExists = this.checkWinnerCols();
        if (!winExists) {
            winExists = this.checkWinnerRows();
        }
        //diagonal with equal xy
        if (!winExists) {
            winExists = this.checkWinnerDiagonal1();
        }
        if (!winExists) {
            winExists = this.checkWinnerDiagonal2();
        }
        if (winExists) {
            for (var _i = 0, _a = this.winPath; _i < _a.length; _i++) {
                var m = _a[_i];
                m.currState = coord_1.sqStates.Selected;
            }
        }
        else
            this.winPath = [];
        return winExists;
    };
    TicTac.prototype.checkWinnerCols = function () {
        var winExists = false;
        var compstate;
        for (var _i = 0, _a = this.board.colGen; _i < _a.length; _i++) {
            var x = _a[_i];
            if (winExists)
                break;
            this.winPath = [];
            for (var _b = 0, _c = this.board.rowGen; _b < _c.length; _b++) {
                var y = _c[_b];
                //console.log("x: " + x + " y " + y);
                var sqR = this.board.getSquare(x, y);
                if (sqR) {
                    if (y == this.board.rows - 1)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    this.winPath.push(sqR);
                    if (y == 0 && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }
        }
        return winExists;
    };
    TicTac.prototype.checkWinnerRows = function () {
        var winExists = false;
        var compstate;
        for (var _i = 0, _a = this.board.rowGen; _i < _a.length; _i++) {
            var y = _a[_i];
            if (winExists)
                break;
            this.winPath = [];
            for (var _b = 0, _c = this.board.colGen; _b < _c.length; _b++) {
                var x = _c[_b];
                //console.log("x: " + x + " y " + y);
                var sqR = this.board.getSquare(x, y);
                if (sqR) {
                    if (x == 0)
                        compstate = sqR.currState;
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    this.winPath.push(sqR);
                    if (x == (this.board.columns - 1) && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }
        }
        return winExists;
    };
    TicTac.prototype.checkWinnerDiagonal1 = function () {
        var winExists = false;
        var compstate;
        this.winPath = [];
        for (var x = 0; x < this.board.columns; x++) {
            var sqR = this.board.getSquare(x, x);
            if (sqR) {
                this.winPath.push(sqR);
                if (x == 0)
                    compstate = sqR.currState;
                else {
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    if (x == (this.board.columns - 1) && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }
        }
        return winExists;
    };
    TicTac.prototype.checkWinnerDiagonal2 = function () {
        var winExists = false;
        var compstate;
        var y = -1;
        this.winPath = [];
        for (var x = this.board.columns - 1; x >= 0; x--) {
            y++;
            var sqR = this.board.getSquare(x, y);
            if (sqR) {
                this.winPath.push(sqR);
                if (y == 0)
                    compstate = sqR.currState;
                else {
                    if (compstate != sqR.currState) {
                        this.winPath = [];
                        break;
                    }
                    if (x == 0 && (compstate == coord_1.sqStates.Start || compstate == coord_1.sqStates.End)) {
                        winExists = true;
                        this.winner = compstate;
                        break;
                    }
                }
            }
        }
        return winExists;
    };
    TicTac.prototype.checkDraw = function () {
        //assume that you check for win first.
        if (!(this.board.getAllSquares().findIndex(function (sq) { return sq.currState == coord_1.sqStates.None; }) > -1))
            this.draw = true;
        return this.draw;
    };
    TicTac.prototype.pushToHistory = function (clickedsq) {
        var sq_copy = new coord_1.Square(clickedsq.x, clickedsq.y, clickedsq.sqcolor);
        sq_copy.currState = clickedsq.currState;
        this.pathSquares.push(sq_copy);
    };
    TicTac.prototype.handleSquareClick = function (clickedsq) {
        //this.board.clearBoardState();
        if (this.inHistory) {
            console.log("In HISTORY CANNOT PLAY");
            return;
        }
        if (this.winner || this.draw) {
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
        this.pushToHistory(clickedsq);
        this.toPlayX = !this.toPlayX;
        var iswinner = this.checkWinner();
        if (iswinner) {
            this.winSq.currState = this.winner;
            console.log("WINNER FOUND");
            return;
        }
        if (this.checkDraw()) {
            console.log("DRAW!!!");
            return;
        }
    };
    TicTac.prototype.gotoCurrent = function () {
        for (var m = 0; m < this.pathSquares.length; m++) {
            var sqref = this.board.getSquare(this.pathSquares[m].x, this.pathSquares[m].y);
            sqref.currState = this.pathSquares[m].currState;
        }
        this.inHistory = false;
        console.log("reset to current board");
    };
    TicTac.prototype.clearBoard = function () {
        this.inHistory = false;
        this.board.clearBoardState();
    };
    TicTac.prototype.startover = function () {
        this.clearBoard();
        this.winner = null;
        this.winPath = [];
        this.pathSquares = [];
        this.draw = false;
        this.winSq.currState = coord_1.sqStates.None;
    };
    TicTac.prototype.getHistory = function (i) {
        console.log(" GO BACK IN HISTORY TO MOVE #" + i);
        if (i < this.pathSquares.length) {
            this.board.clearBoardState();
            if (i == this.pathSquares.length - 1)
                this.inHistory = false;
            else
                this.inHistory = true;
            for (var m = 0; m <= i; m++) {
                var sqref = this.board.getSquare(this.pathSquares[m].x, this.pathSquares[m].y);
                sqref.currState = this.pathSquares[m].currState;
            }
        }
    };
    return TicTac;
}());
__decorate([
    core_1.ViewChild(board2_1.Board2),
    __metadata("design:type", board2_1.Board2)
], TicTac.prototype, "board2", void 0);
TicTac = __decorate([
    core_1.Component({
        moduleId: module.id.toString(),
        selector: 'tictac',
        templateUrl: './tictac.component.html',
        styleUrls: ['tictac.css']
    }),
    __metadata("design:paramtypes", [])
], TicTac);
exports.TicTac = TicTac;
//# sourceMappingURL=tictac.js.map