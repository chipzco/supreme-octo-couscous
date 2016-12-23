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
    }
    TicTac.prototype.ngOnInit = function () {
        this.pathSquares = [];
        this.toPlayX = true;
    };
    TicTac.prototype.setBoard = function (boardobj) {
        this.board = boardobj;
        // console.log(boardobj);
    };
    TicTac.prototype.handleSquareClick = function (clickedsq) {
        //this.board.clearBoardState();
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