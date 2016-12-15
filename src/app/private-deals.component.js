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
// We haven't defined these services yet
var auth_service_1 = require('./auth.service');
var deal_service_1 = require('./deal.service');
var PrivateDealsComponent = (function () {
    // Note: We haven't implemented the Deal or Auth Services yet.
    function PrivateDealsComponent(dealService, authService) {
        this.dealService = dealService;
        this.authService = authService;
    }
    // When this component is loaded, we'll call the dealService and get our public deals.
    PrivateDealsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dealService.getPrivateDeals().then(function (deals) { return _this.privateDeals = deals; }).catch(function (e) { console.error('error fetching deals', e); });
    };
    PrivateDealsComponent.prototype.purchase = function (item) {
        alert("You bought the: " + item.name);
    };
    PrivateDealsComponent = __decorate([
        core_1.Component({
            selector: 'public-deals',
            moduleId: module.id,
            // We'll use an external file for both the CSS styles and HTML view
            templateUrl: 'private-deals.component.html',
            styleUrls: ['public-deals.component.css']
        }), 
        __metadata('design:paramtypes', [deal_service_1.DealService, auth_service_1.AuthService])
    ], PrivateDealsComponent);
    return PrivateDealsComponent;
}());
exports.PrivateDealsComponent = PrivateDealsComponent;
//# sourceMappingURL=private-deals.component.js.map