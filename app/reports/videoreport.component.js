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
var video_service_1 = require('./video.service');
var VideoReportComponent = (function () {
    function VideoReportComponent(videoservice) {
        this.videoservice = videoservice;
    }
    VideoReportComponent.prototype.ngOnInit = function () {
        console.log('in reports');
        this.updcounters();
    };
    VideoReportComponent.prototype.updcounters = function () {
        this.pollCount = this.videoservice.pollCount;
        this.aIndex = this.videoservice.aIndex;
        /* if (this.pollCount > 5)
            this.stopObserving();*/
    };
    VideoReportComponent.prototype.getVideos = function ($event) {
        var _this = this;
        this.sus = this.videoservice.getVideos().subscribe(function (a) { _this.updcounters(); _this.vids = a; }, function (e) { console.log("ERROR:" + e); console.log(_this.videoservice.errtxt); });
        $event.preventDefault();
        console.log($event);
    };
    VideoReportComponent.prototype.stopObserving = function () {
        if (this.sus)
            this.sus.unsubscribe();
    };
    VideoReportComponent.prototype.ngOnDestroy = function () {
        if (this.sus)
            this.sus.unsubscribe();
    };
    VideoReportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'report',
            templateUrl: 'videoreport.component.html'
        }), 
        __metadata('design:paramtypes', [video_service_1.VideoService])
    ], VideoReportComponent);
    return VideoReportComponent;
}());
exports.VideoReportComponent = VideoReportComponent;
//# sourceMappingURL=videoreport.component.js.map