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
var jquery_service_1 = require("./../jquery.service");
var ChatComponent = (function () {
    function ChatComponent(jq) {
        this.jq = jq;
        this.message = "";
        this.messages = new Array();
    }
    ChatComponent.prototype.SendSignal = function () {
        this.chatConn.server.send(this.name, this.message);
        console.log("trying to send");
    };
    ChatComponent.prototype.pushMessage = function (message) {
        console.log(message);
        //this.messages.push(message);
    };
    ChatComponent.prototype.ngOnInit = function () {
        this.name = " I AMTESTING";
        this.messages = new Array();
        var myms = this.messages;
        var myf = function (message) {
            myms.push(message);
        };
        if (this.jq.JQueryOK) {
            console.log('start init comp jq ok');
            var $ = this.jq.JQuery;
            this.chatConn = $.connection.octo2Hub;
            // Create a function that the hub can call to broadcast messages.
            this.chatConn.client.broadcastMessage = function (name, message) {
                //console.log(message);
                myf(message);
                //this.pushMessage(message);
            };
            $.connection.hub.start().done(function () {
                console.log("connection to hub done");
            });
        }
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        moduleId: module.id.toString(),
        templateUrl: './chat.html'
    }),
    __metadata("design:paramtypes", [jquery_service_1.JQueryService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map