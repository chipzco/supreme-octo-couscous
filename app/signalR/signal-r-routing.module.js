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
var router_1 = require("@angular/router");
var signal_r_component_1 = require("./signal-r.component");
var chat_component_1 = require("./chat.component");
var chat2_component_1 = require("./chat2.component");
var SignalRRoutingModule = (function () {
    function SignalRRoutingModule() {
    }
    return SignalRRoutingModule;
}());
SignalRRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild([
                { path: 'signal', component: signal_r_component_1.SignalRComponent },
                { path: 'chat', component: chat_component_1.ChatComponent },
                { path: 'chat2', component: chat2_component_1.Chat2Component }
            ])],
        exports: [router_1.RouterModule]
    }),
    __metadata("design:paramtypes", [])
], SignalRRoutingModule);
exports.SignalRRoutingModule = SignalRRoutingModule;
//# sourceMappingURL=signal-r-routing.module.js.map