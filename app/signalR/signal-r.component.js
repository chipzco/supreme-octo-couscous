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
var channel_service_1 = require("./channel.service");
var SignalRComponent = (function () {
    function SignalRComponent(channelService) {
        this.channelService = channelService;
        // Let's wire up to the signalr observables
        //
        this.connectionState$ = this.channelService.connectionState$.map(function (state) { return channel_service_1.ConnectionState[state]; });
        this.channelService.error$.subscribe(function (error) { console.log(error); }, function (error) { console.error("errors$ error", error); });
        // Wire up a handler for the starting$ observable to log the
        //  success/fail result
        //
        this.channelService.starting$.subscribe(function () { console.log("signalr service has been started"); }, function () { console.warn("signalr service failed to start!"); });
    }
    SignalRComponent.prototype.ngOnInit = function () {
        // Start the connection up!
        //
        console.log("Starting the channel service");
        this.channelService.start();
    };
    return SignalRComponent;
}());
SignalRComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'report',
        templateUrl: 'signal-r.component.html'
    }),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], SignalRComponent);
exports.SignalRComponent = SignalRComponent;
//# sourceMappingURL=signal-r.component.js.map