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
            console.log('The passed in object is not null forget instance of crap');
            if (this.outer_windowObj.$) {
                console.log('JQuery $ found in jquery service');
                if (this.outer_windowObj.$.hubConnection) {
                    console.log('has SignalR hub connection');
                    if (this.outer_windowObj.$.signalR) {
                        console.log('has signalR');
                        this.JQueryOK = true;
                        this._$666 = this.outer_windowObj.$;
                        console.warn("JQUERY!!!: " + this.JQuery.fn.jquery);
                    }
                }
            }
        }
    }
    get JQuery(): any {
        return <any>this._$666;
    }
}


