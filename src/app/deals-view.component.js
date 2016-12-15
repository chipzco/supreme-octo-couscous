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
var DealsViewComponent = (function () {
    function DealsViewComponent() {
    }
    DealsViewComponent.prototype.purchase = function (item) {
        alert("You bought the: " + item.name);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DealsViewComponent.prototype, "deals", void 0);
    DealsViewComponent = __decorate([
        core_1.Component({
            selector: 'deals',
            moduleId: module.id,
            // We'll use an external file for both the CSS styles and HTML view
            templateUrl: 'deals-view.component.html',
            styleUrls: ['public-deals.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DealsViewComponent);
    return DealsViewComponent;
}());
exports.DealsViewComponent = DealsViewComponent;
//# sourceMappingURL=deals-view.component.js.map