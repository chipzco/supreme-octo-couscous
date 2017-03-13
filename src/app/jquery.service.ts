import { Injectable, Inject } from '@angular/core';
import { WindowExtend, JQMinSpec } from './window-extend';
declare let window: WindowExtend;	
@Injectable()
export class JQueryService {	
    private _$666: JQMinSpec;
    JQueryOK: boolean;	    	
    signalROK: boolean;
    constructor() {
        this.JQueryOK = false;
        this.signalROK = false;
        if (window && window.$) {
            this._$666 = window.$;
            this.JQueryOK = true;
            if (this._$666.hubConnection && this._$666.signalR)
                this.signalROK = true;            
        }
    } 
    get JQuery(): any {
        return <any>this._$666;
    }
}


