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
var tictac_routing_module_1 = require('./tictac-routing.module');
var tictac_1 = require('./tictac');
var board2_1 = require('./board2');
var square_1 = require('./square');
var TicTacModule = (function () {
    function TicTacModule() {
    }
    TicTacModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, tictac_routing_module_1.TicTacRoutingModule],
            declarations: [tictac_1.TicTac, board2_1.Board2, square_1.Square2]
        }), 
        __metadata('design:paramtypes', [])
    ], TicTacModule);
    return TicTacModule;
}());
exports.TicTacModule = TicTacModule;
//# sourceMappingURL=tictac.module.js.map