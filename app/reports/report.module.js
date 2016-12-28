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
var report_routing_module_1 = require('./report-routing.module');
var report_component_1 = require('./report.component');
var video_service_1 = require('./video.service');
var videoreport_component_1 = require('./videoreport.component');
var ReportModule = (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, report_routing_module_1.ReportRoutingModule],
            declarations: [report_component_1.ReportComponent, videoreport_component_1.VideoReportComponent],
            providers: [video_service_1.VideoService]
        }), 
        __metadata('design:paramtypes', [])
    ], ReportModule);
    return ReportModule;
}());
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map