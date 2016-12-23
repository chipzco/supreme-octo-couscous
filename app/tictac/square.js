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
var Square2 = (function () {
    function Square2() {
        this.instanceSq = new core_1.EventEmitter();
        this.clickedSq = new core_1.EventEmitter();
    }
    Square2.prototype.ngOnInit = function () {
        this.sqInfo = new coord_1.Square(this.x, this.y, this.sqcolor);
        this.sqInfo.colors = this.colors;
        this.instanceSq.emit(this.sqInfo);
    };
    Square2.prototype.onClick = function () {
        console.log('hi');
        this.clickedSq.emit(this.sqInfo);
        console.log(this.sqInfo);
    };
    Square2.prototype.getColor = function () {
        return this.sqInfo.getColor();
    };
    Object.defineProperty(Square2.prototype, "currState", {
        set: function (newstate) { this.sqInfo.currState = newstate; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square2.prototype, "alg_not", {
        get: function () { return this.sqInfo.alg_not; },
        enumerable: true,
        configurable: true
    });
    Square2.prototype.getClassfromSq = function (sq) {
        var classname = "col-md-1 square " + this.getColor();
        //console.log(classname);
        return classname;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Square2.prototype, "sqcolor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Square2.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Square2.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Square2.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Square2.prototype, "instanceSq", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Square2.prototype, "clickedSq", void 0);
    Square2 = __decorate([
        core_1.Component({
            moduleId: module.id.toString(),
            selector: 'square',
            templateUrl: 'square.component.html',
            styleUrls: ['tictac.css']
        }), 
        __metadata('design:paramtypes', [])
    ], Square2);
    return Square2;
}());
exports.Square2 = Square2;
//# sourceMappingURL=square.js.map