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
var coord_1 = require('./coord');
var knight_service_1 = require('./knight.service');
var KnightComponent = (function () {
    function KnightComponent(knightService) {
        this.knightService = knightService;
    }
    KnightComponent.prototype.ngOnInit = function () {
        this.board = new coord_1.Board(8, 8);
        this.squares = this.board.getAllSquares();
        //console.log(this.squares);	
        this.cols = [7, 6, 5, 4, 3, 2, 1, 0];
        this.rows = [0, 1, 2, 3, 4, 5, 6, 7];
        this.pathSquares = new Array();
    };
    KnightComponent.prototype.getSq = function (x, y) {
        return this.board.getSquare(x, y);
    };
    KnightComponent.prototype.getClass = function (x, y) {
        var classname = "";
        var sq = this.getSq(x, y);
        if (sq)
            classname = this.getClassfromSq(sq);
        //console.log("x=" + x + " y= " +  y + "class = " + classname);
        return classname;
    };
    KnightComponent.prototype.getClassfromSq = function (sq) {
        return "col-md-1 square " + sq.getColor();
    };
    KnightComponent.prototype.setPath = function (x, y) {
        this.clearPathIfSet();
        var sq = this.getSq(x, y);
        if (sq) {
            this.board.clearBoardState(this.pathSquares);
            if (!this.pathSquares.length)
                sq.currState = coord_1.sqStates.Start;
            else
                sq.currState = coord_1.sqStates.End;
            this.pathSquares.push(sq);
        }
    };
    KnightComponent.prototype.squaresSelected = function () {
        if (this.pathSquares.length == 2)
            return true;
        return false;
    };
    KnightComponent.prototype.clearPathIfSet = function () {
        if (this.pathSquares.length >= 2) {
            for (var _i = 0, _a = this.pathSquares; _i < _a.length; _i++) {
                var sq = _a[_i];
                sq.currState = coord_1.sqStates.None;
            }
            this.pathSquares = [];
        }
    };
    KnightComponent.prototype.showPaths = function () {
        var _this = this;
        this.knightService.startKnightPath(this.pathSquares[0], this.pathSquares[1]).subscribe(function (a) { return _this.mymoves = a; });
    };
    KnightComponent.prototype.colorPath = function (path) {
        this.board.clearBoardState(this.pathSquares);
        var x = 0;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var c = path_1[_i];
            if (x != 0 && x != path.length - 1) {
                var sq = this.board.getSquare(c.x, c.y);
                sq.currState = coord_1.sqStates.Path;
            }
            x++;
        }
    };
    KnightComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'board',
            templateUrl: 'knight.component.html',
            styleUrls: ['knight.component.css']
        }), 
        __metadata('design:paramtypes', [knight_service_1.KnightService])
    ], KnightComponent);
    return KnightComponent;
}());
exports.KnightComponent = KnightComponent;
//# sourceMappingURL=knight.component.js.map