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
        this.hiback = new core_1.EventEmitter();
    }
    Board2.prototype.ngOnInit = function () {
        this.numsquares = this.rows * this.columns;
        this.mycolor = coord_1.sqColor.black;
    };
    Board2.prototype.hitchild = function () {
        console.log("I hit heree");
        this.hiback.emit(this);
    };
    Board2.prototype.hitme = function () {
        this.numsquares = 999;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Board2.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Board2.prototype, "columns", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Board2.prototype, "hiback", void 0);
    Board2 = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'board',
            templateUrl: 'board.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], Board2);
    return Board2;
}());
exports.Board2 = Board2;
//# sourceMappingURL=board2.js.map