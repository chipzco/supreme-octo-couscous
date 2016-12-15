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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var app_component_1 = require('./app.component');
var heroes_module_1 = require('./heroes/heroes.module');
var deal_service_1 = require('./deal.service');
var auth_service_1 = require('./auth.service');
var app_routing_module_1 = require('./app-routing.module');
var deals_component_1 = require('./deals.component');
var private_deals_component_1 = require('./private-deals.component');
var deals_view_component_1 = require('./deals-view.component');
var dashboard_component_1 = require('./dashboard.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, heroes_module_1.HeroesModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                deals_view_component_1.DealsViewComponent,
                private_deals_component_1.PrivateDealsComponent,
                deals_component_1.PublicDealsComponent,
                dashboard_component_1.DashboardComponent
            ],
            providers: [
                deal_service_1.DealService,
                auth_service_1.AuthService,
                angular2_jwt_1.AUTH_PROVIDERS
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map