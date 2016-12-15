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
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/add/operator/toPromise');
var DealService = (function () {
    function DealService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
        // Define the routes we are going to interact with
        this.publicDealsUrl = 'http://localhost:3001/api/deals/public';
        this.privateDealsUrl = 'http://localhost:3001/api/deals/private';
        this.phpUrl = 'http://localhost:8000/api/ping';
    }
    // Implement a method to get the public deals
    DealService.prototype.getPublicDeals = function () {
        return this.http
            .get(this.publicDealsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // Implement a method to get the private deals
    DealService.prototype.getPrivateDeals = function () {
        return this.authHttp
            .get(this.privateDealsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DealService.prototype.getPHPping = function () {
        return this.authHttp
            .get(this.phpUrl)
            .toPromise()
            .then(function (response) { return response.json(); }) //
            .catch(this.handleError);
    };
    // Implement a method to handle errors if any
    DealService.prototype.handleError = function (error) {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    DealService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], DealService);
    return DealService;
}());
exports.DealService = DealService;
//# sourceMappingURL=deal.service.js.map