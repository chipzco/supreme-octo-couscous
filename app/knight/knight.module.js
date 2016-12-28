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
var common_1 = require('@angular/common');
var knight_routing_module_1 = require('./knight-routing.module');
var knight_component_1 = require('./knight.component');
var knight_service_1 = require('./knight.service');
var observe_component_1 = require('./observe.component');
var observe_service_1 = require('./observe.service');
var KnightModule = (function () {
    function KnightModule() {
    }
    KnightModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, knight_routing_module_1.KnightRoutingModule],
            declarations: [knight_component_1.KnightComponent, observe_component_1.ObserveComponent],
            providers: [knight_service_1.KnightService, observe_service_1.ObserveService]
        }), 
        __metadata('design:paramtypes', [])
    ], KnightModule);
    return KnightModule;
}());
exports.KnightModule = KnightModule;
//# sourceMappingURL=knight.module.js.map