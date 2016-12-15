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
require('rxjs/add/operator/switchMap');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var HeroListComponent = (function () {
    function HeroListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    HeroListComponent.prototype.onSelect = function (hero) {
        this.router.navigate(['/hero', hero.id]);
    };
    HeroListComponent.prototype.isSelected = function (hero) { return hero.id === this.selectedId; };
    HeroListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this.route.params
            .switchMap(function (params) {
            _this.selectedId = +params['id'];
            return _this.service.getHeroes();
        });
    };
    HeroListComponent = __decorate([
        core_1.Component({
            selector: 'heros',
            moduleId: module.id,
            templateUrl: 'hero-list.component.html',
            styleUrls: ['heroes.component.css']
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.ActivatedRoute, router_1.Router])
    ], HeroListComponent);
    return HeroListComponent;
}());
exports.HeroListComponent = HeroListComponent;
//# sourceMappingURL=hero-list.component.js.map