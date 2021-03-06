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
var channel_service_1 = require("./channel.service");
var StatusEvent = (function () {
    function StatusEvent() {
    }
    return StatusEvent;
}());
var TaskComponent = (function () {
    function TaskComponent(http, channelService) {
        this.http = http;
        this.channelService = channelService;
        this.messages = "";
        this.channel = "tasks";
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get an observable for events emitted on this channel
        //
        this.channelService.sub(this.channel).subscribe(function (x) {
            switch (x.Name) {
                case _this.eventName: {
                    _this.appendStatusUpdate(x);
                }
            }
        }, function (error) {
            console.warn("Attempt to join channel failed!", error);
        });
    };
    TaskComponent.prototype.appendStatusUpdate = function (ev) {
        // Just prepend this to the messages string shown in the textarea
        //
        var date = new Date();
        switch (ev.Data.State) {
            case "starting": {
                this.messages = date.toLocaleTimeString() + " : starting\n" + this.messages;
                break;
            }
            case "complete": {
                this.messages = date.toLocaleTimeString() + " : complete\n" + this.messages;
                break;
            }
            default: {
                this.messages = date.toLocaleTimeString() + " : " + ev.Data.State + " : " + ev.Data.PercentComplete + " % complete\n" + this.messages;
            }
        }
    };
    TaskComponent.prototype.callApi = function () {
        this.http.get(this.apiUrl)
            .map(function (res) { return res.json(); })
            .subscribe(function (message) { console.log(message); });
    };
    return TaskComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TaskComponent.prototype, "eventName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TaskComponent.prototype, "apiUrl", void 0);
TaskComponent = __decorate([
    core_1.Component({
        selector: 'task',
        moduleId: module.id.toString(),
        templateUrl: './task.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        channel_service_1.ChannelService])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map