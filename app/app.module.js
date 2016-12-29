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
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var my_service_1 = require("./my-service");
var jquery_service_1 = require("./jquery.service");
var app_component_1 = require("./app.component");
var about_component_1 = require("./about.component");
var app_routing_module_1 = require("./app-routing.module");
var knight_module_1 = require("./knight/knight.module");
var tictac_module_1 = require("./tictac/tictac.module");
var report_module_1 = require("./reports/report.module");
var signal_r_module_1 = require("./signalR/signal-r.module");
window.$ = new jquery_service_1.myFu();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, knight_module_1.KnightModule, tictac_module_1.TicTacModule, report_module_1.ReportModule, signal_r_module_1.SignalRModule, app_routing_module_1.AppRoutingModule],
        declarations: [app_component_1.AppComponent, about_component_1.AboutComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [my_service_1.myService, jquery_service_1.JQueryService, { provide: jquery_service_1.WindowExtend, useValue: window }]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map