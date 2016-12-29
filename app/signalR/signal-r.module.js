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
var common_1 = require("@angular/common");
var signal_r_routing_module_1 = require("./signal-r-routing.module");
var signal_r_component_1 = require("./signal-r.component");
var task_component_1 = require("./task.component");
var channel_service_1 = require("./channel.service");
var channelConfig = new channel_service_1.ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "EventHub";
var SignalRModule = (function () {
    function SignalRModule() {
    }
    return SignalRModule;
}());
SignalRModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, signal_r_routing_module_1.SignalRRoutingModule],
        declarations: [signal_r_component_1.SignalRComponent, task_component_1.TaskComponent],
        providers: [channel_service_1.ChannelService,
            { provide: channel_service_1.SignalrWindow, useValue: window },
            { provide: 'channel.config', useValue: channelConfig }
        ]
    }),
    __metadata("design:paramtypes", [])
], SignalRModule);
exports.SignalRModule = SignalRModule;
//# sourceMappingURL=signal-r.module.js.map