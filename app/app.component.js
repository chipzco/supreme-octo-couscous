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
var my_service_1 = require('./my-service');
var router_1 = require("@angular/router");
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
var AppComponent = (function () {
    function AppComponent(myservice, r, router) {
        this.myservice = myservice;
        this.r = r;
        this.router = router;
        this.name = 'Oct';
        this.currPath = "hmm";
        this.mynum = myservice.checknum();
        this.crumbs = [];
        //this.currPath=r.url;
        // r.url.subscribe((s:UrlSegment[]) => { console.log("url", s); this.currPath=s[0].path; console.log(this.currPath);});	
    }
    AppComponent.prototype.setMyUrlState = function (url) {
        //this.crumbs.push(x);
        this.currPath = url;
        console.log(url);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.router.events.filter(event => event instanceof NavigationEnd).map(url=>url.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  			
        var retNav = this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; });
        retNav.map(function (e) { return e.urlAfterRedirects; }).subscribe(function (a) { return _this.setMyUrlState(a); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            moduleId: module.id.toString(),
            templateUrl: './app.component.html'
        }), 
        __metadata('design:paramtypes', [my_service_1.myService, router_1.ActivatedRoute, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map