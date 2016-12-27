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
var observe_service_1 = require("./observe.service");
var knight_service_1 = require("./knight.service");
var coord_1 = require("./coord");
var ObserveComponent = (function () {
    function ObserveComponent(observeService, knightService) {
        this.observeService = observeService;
        this.knightService = knightService;
        this.myvar = 5;
    }
    ObserveComponent.prototype.ngOnInit = function () {
        //this.observeService.runTimer().subscribe(a=> { this.myvar=a.value; this.timestamp=a.timestamp; this.anobject=a; console.log(a) } );
        var _this = this;
        var A = new coord_1.Coord(0, 0);
        var B = new coord_1.Coord(7, 7);
        this.knightService.startKnightPath(A, B).subscribe(function (a) { return _this.mymoves = a; });
        this.knightService.testObserver().subscribe(function (a) { return _this.myvar = a; });
    };
    return ObserveComponent;
}());
ObserveComponent = __decorate([
    core_1.Component({
        selector: 'has-a-form',
        template: "{{myvar}}   {{timestamp}}  <br/> My Move Number:\n\t<div *ngFor=\"let t of mymoves; let i=index;\">\n\t\tMin Num Turns: {{ t.numTurns }}  <br/>\n\t\t<b>{{i}}:</b> <span *ngFor=\"let sq of t.path; let fin=last\">{{ sq.alg_not }} <i *ngIf=\"!fin\">to </i></span> \n\t</div>"
    }),
    __metadata("design:paramtypes", [observe_service_1.ObserveService, knight_service_1.KnightService])
], ObserveComponent);
exports.ObserveComponent = ObserveComponent;
//# sourceMappingURL=observe.component.js.map