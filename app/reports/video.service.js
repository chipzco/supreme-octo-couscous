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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/throw");
var VideoService = (function () {
    function VideoService(http) {
        this.http = http;
        this.name = 'Injected Service';
        this.url = 'http://medialib.proph.web/?act=videoang.index.public';
        this.headers = new http_1.Headers();
        this.pollCount = -1;
        this.aIndex = -1;
        this.stopPolling = new Subject_1.Subject();
        this._errtxt = "";
        //{ , "Accept": "application/json" });
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Accept", "application/json");
    }
    VideoService.prototype.getObsVid = function (val, ix) {
        this.pollCount = val;
        this.aIndex = ix;
        if (this.pollCount > 5)
            this.stopPolling.next(true); //retryWhen(error => error.delay(200)).timeout(1500).
        return this.http.get(this.url, { headers: this.headers }).catch(function (err) { return Rx_1.Observable.throw(err); }).map(function (resp) { return resp.json(); });
    };
    VideoService.prototype.getVideos = function () {
        var _this = this;
        this._errtxt = "";
        //let myob: any = Observable.            
        //return Observable.interval(10000).switchMap((val, index) => { this.pollCount = val; this.aIndex = index; return this.http.get(this.url, { headers: this.headers }).map((res: Response) => res.json()) });
        return Rx_1.Observable.interval(2000).switchMap(function (val, ix) { return _this.getObsVid(val, ix); }).takeUntil(this.stopPolling);
    };
    Object.defineProperty(VideoService.prototype, "errtxt", {
        get: function () {
            return this._errtxt;
        },
        enumerable: true,
        configurable: true
    });
    return VideoService;
}());
VideoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map