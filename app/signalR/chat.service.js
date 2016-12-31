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
var Subject_1 = require("rxjs/Subject");
var jquery_service_1 = require("./../jquery.service");
var MsgClass = (function () {
    function MsgClass(name, message) {
        if (name === void 0) { name = ""; }
        if (message === void 0) { message = ""; }
        this.name = name;
        this.message = message;
    }
    return MsgClass;
}());
exports.MsgClass = MsgClass;
var ChatService = (function () {
    function ChatService(jq) {
        var _this = this;
        this.jq = jq;
        this.startingSubject = new Subject_1.Subject();
        this.msgSubject = new Subject_1.Subject();
        this.hubOK = false;
        this.msgcomps = new Array();
        this.msgComp = new MsgClass();
        if (this.jq.JQueryOK) {
            var $ = this.jq.JQuery;
            console.log('start init comp jq ok');
            this.chatConn = $.connection.octo2Hub;
        }
        this.startingSubject.subscribe(function () { return _this.hubOK = true; });
    }
    Object.defineProperty(ChatService.prototype, "msgObs", {
        get: function () {
            return this.msgSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ChatService.prototype.start = function () {
        if (this.jq.JQueryOK) {
            var $ = this.jq.JQuery;
            // Create a function that the hub can call to broadcast messages.
            var myms_1 = new Array(); //this.msgcomps;
            var mySub_1 = this.startingSubject;
            var mymsgSub_1 = this.msgSubject;
            var myf_1 = function (name, message) {
                myms_1.push(new MsgClass(name, message));
                mymsgSub_1.next(myms_1);
            };
            if (this.chatConn) {
                this.chatConn.client.broadcastMessage = function (name, message) {
                    myf_1(name, message);
                };
                $.connection.hub.start().done(function () {
                    console.log("connection to hub done");
                    mySub_1.next(true);
                });
            }
            else {
                console.log("Cannot init chat Conn");
            }
        }
    };
    ChatService.prototype.sendChat = function (name, message) {
        if (this.hubOK)
            this.chatConn.server.send(name, message);
        else {
            console.log("Hub is not setup");
        }
    };
    return ChatService;
}());
ChatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [jquery_service_1.JQueryService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map