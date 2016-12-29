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
var video_service_1 = require("./video.service");
//import { ChannelService } from '../signalR/channel.service';
var jquery_service_1 = require("../jquery.service");
var ReportComponent = (function () {
    function ReportComponent(videoservice, jqueryservice) {
        this.videoservice = videoservice;
        this.jqueryservice = jqueryservice;
    } //private channelservice: ChannelService,
    ReportComponent.prototype.ngOnInit = function () {
        this.reports = ['Bank Report', 'Currency Report', 'Transaction Report', 'Study Listing', 'Video Listing'];
        console.log(this.jqueryservice.JQueryOK);
        /*
        this.myjq=this.channelservice.jq;
        console.log("JQuery version:" + this.myjq.fn.jquery);
        let jsjq: any=this.myjq;
        jsjq("#myButton").click(function () {
            jsjq("p").slideToggle("slow");     //cannot use this object with jquery callback.
            //console.log('aha!');
        });
        */
    };
    ReportComponent.prototype.getVideos = function () {
        this.vids = this.videoservice.getVideos();
        var myjq = this.jqueryservice.JQuery;
        if (myjq) {
            console.log("hello working?: " + this.jqueryservice.JQueryOK);
            //jquery
            myjq(".featurette").slideToggle("slow");
        }
        else {
            console.warn("Hello moron:" + this.jqueryservice.JQueryOK);
        }
    };
    return ReportComponent;
}());
ReportComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'report',
        templateUrl: 'report.component.html',
        styleUrls: ['report.component.css']
    }),
    __metadata("design:paramtypes", [video_service_1.VideoService, jquery_service_1.JQueryService])
], ReportComponent);
exports.ReportComponent = ReportComponent;
//# sourceMappingURL=report.component.js.map