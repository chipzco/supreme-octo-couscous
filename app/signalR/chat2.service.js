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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var jquery_service_1 = require("./../jquery.service");
var chat_service_1 = require("./chat.service");
var channel_service_1 = require("./channel.service");
var Chat2Service = (function () {
    function Chat2Service(jq, chatConfig) {
        var _this = this;
        this.jq = jq;
        this.chatConfig = chatConfig;
        this.startingSubject = new Subject_1.Subject();
        this.connectionStateSubject = new Subject_1.Subject();
        this.msgSubject = new Subject_1.Subject();
        this.hubOK = false;
        this.msgcomps = new Array();
        this.msgComp = new chat_service_1.MsgClass();
        if (this.jq.JQueryOK) {
            var $_1 = this.jq.JQuery;
            console.log('start init comp jq ok');
            this.hubConnection = $_1.hubConnection();
            this.hubConnection.url = chatConfig.url;
            this.hubProxy = this.hubConnection.createHubProxy(chatConfig.hubName);
            if (this.hubConnection) {
                this.hubConnection.stateChanged(function (state) {
                    var newState = channel_service_1.ConnectionState.Connecting;
                    switch (state.newState) {
                        case $_1.signalR.connectionState.connecting:
                            newState = channel_service_1.ConnectionState.Connecting;
                            break;
                        case $_1.signalR.connectionState.connected:
                            newState = channel_service_1.ConnectionState.Connected;
                            break;
                        case $_1.signalR.connectionState.reconnecting:
                            newState = channel_service_1.ConnectionState.Reconnecting;
                            break;
                        case $_1.signalR.connectionState.disconnected:
                            newState = channel_service_1.ConnectionState.Disconnected;
                            break;
                    }
                    // Push the new state on our subject
                    //
                    _this.connectionStateSubject.next(newState);
                });
                var myms_1 = new Array(); //this.msgcomps;
                var mymsgSub_1 = this.msgSubject;
                var myf_1 = function (name, message) {
                    myms_1.push(new chat_service_1.MsgClass(name, message));
                    mymsgSub_1.next(myms_1);
                };
                this.hubProxy.on("broadcastMessage", function (name, message) {
                    myf_1(name, message);
                });
            }
        }
        this.startingSubject.subscribe(function () { return _this.hubOK = true; });
    }
    Object.defineProperty(Chat2Service.prototype, "msgObs", {
        get: function () {
            return this.msgSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chat2Service.prototype, "connectionState$", {
        get: function () {
            return this.connectionStateSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Chat2Service.prototype.start = function () {
        // Create a function that the hub can call to broadcast messages.
        var mySub = this.startingSubject;
        this.hubConnection.start().done(function () {
            console.log("connection to hub done");
            mySub.next(true);
        });
    };
    Chat2Service.prototype.sendChat = function (name, message) {
        if (this.hubOK)
            this.hubProxy.invoke("send", name, message);
        else {
            console.log("Hub is not setup");
        }
    };
    return Chat2Service;
}());
Chat2Service = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject("chat.config")),
    __metadata("design:paramtypes", [jquery_service_1.JQueryService,
        channel_service_1.ChannelConfig])
], Chat2Service);
exports.Chat2Service = Chat2Service;
//# sourceMappingURL=chat2.service.js.map