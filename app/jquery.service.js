"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var WindowExtend = (function (_super) {
    __extends(WindowExtend, _super);
    function WindowExtend() {
        return _super.apply(this, arguments) || this;
    }
    return WindowExtend;
}(Window));
exports.WindowExtend = WindowExtend;
var myFu = (function () {
    function myFu() {
        this.signalR = { name: 'fu', connectionState: { info: 'none' }
        };
        this.fn = {
            jquery: "fu"
        };
    }
    myFu.prototype.hubConnection = function () {
        console.log("IT is fucked!");
    };
    ;
    return myFu;
}());
exports.myFu = myFu;
var JQueryService = (function () {
    function JQueryService(outer_windowObj) {
        this.outer_windowObj = outer_windowObj;
        this.JQueryOK = false;
        if (this.outer_windowObj) {
            console.log('The passed in object is not null forget instance of crap');
            if (this.outer_windowObj.$) {
                console.log('has $');
                if (this.outer_windowObj.$.hubConnection) {
                    console.log('has hub connectoion');
                    if (this.outer_windowObj.$.signalR) {
                        console.log('has signal R');
                        this.JQueryOK = true;
                        this._$666 = this.outer_windowObj.$;
                        console.warn("JQUERY!!!: " + this.JQuery.fn.jquery);
                        if (this.outer_windowObj instanceof WindowExtend)
                            console.warn('YES IT IS NOW INSTACE OF window EXTEND');
                        if (this.outer_windowObj instanceof Window)
                            console.warn('HMM IT IS NOW INSTACE OF window');
                        console.log(typeof this.outer_windowObj);
                    }
                }
            }
        }
        else {
            console.log('hmmmm');
        }
    }
    Object.defineProperty(JQueryService.prototype, "JQuery", {
        get: function () {
            return this._$666;
        },
        enumerable: true,
        configurable: true
    });
    return JQueryService;
}());
JQueryService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(WindowExtend)),
    __metadata("design:paramtypes", [WindowExtend])
], JQueryService);
exports.JQueryService = JQueryService;
//# sourceMappingURL=jquery.service.js.map