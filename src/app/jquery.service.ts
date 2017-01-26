import { Injectable, Inject } from '@angular/core';


export class WindowExtend extends Window {
    $: JQMinSpec;
}

export interface JQMinSpec {
    hubConnection: any;
    signalR: any;
    fn: any;
}


@Injectable()
export class JQueryService {
    private _$666: JQMinSpec;
    JQueryOK: boolean;
    constructor( @Inject(WindowExtend) private outer_windowObj: WindowExtend) {
        this.JQueryOK = false;
        if (this.outer_windowObj) {            
            if (this.outer_windowObj.$) {                
                if (this.outer_windowObj.$.hubConnection) {                  
                    if (this.outer_windowObj.$.signalR) {                        
                        this.JQueryOK = true;
                        this._$666 = this.outer_windowObj.$;                        
                    }
                }
            }
        }        
    }
    get JQuery(): any {
        return <any>this._$666;
    }
}


