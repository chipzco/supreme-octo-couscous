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
var chat2_service_1 = require("./chat2.service");
var channel_service_1 = require("./channel.service");
var Chat2Component = (function () {
    function Chat2Component(chatservice) {
        this.chatservice = chatservice;
        this.message = "";
        this.messages = new Array();
        this.connectionState$ = this.chatservice.connectionState$.map(function (state) { return channel_service_1.ConnectionState[state]; });
    }
    Chat2Component.prototype.SendSignal = function () {
        this.chatservice.sendChat(this.name, this.message);
        this.message = "";
    };
    /*
    checkData(): void {
        console.log(this.chatservice.msgcomps);
        this.msgcomps.subscribe((arr: Array<MsgClass>)=> { console.log(arr); return arr; });
    }
    */
    Chat2Component.prototype.ngOnInit = function () {
        this.name = " I AMTESTING";
        this.messages = new Array();
        var myms = this.messages;
        this.msgcomps = this.chatservice.msgObs; //this.chatservice.msgcomps;
        this.chatservice.start();
    };
    return Chat2Component;
}());
Chat2Component = __decorate([
    core_1.Component({
        selector: 'chat',
        moduleId: module.id.toString(),
        templateUrl: './chat.html',
        styleUrls: ['chat.css']
    }),
    __metadata("design:paramtypes", [chat2_service_1.Chat2Service])
], Chat2Component);
exports.Chat2Component = Chat2Component;
//# sourceMappingURL=chat2.component.js.map