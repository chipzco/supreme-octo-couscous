import { Injectable, Inject } from '@angular/core';

export const windowobj: Window=window;

export class WindowExtend extends Window {
    $: JQMinSpec;
}

export interface JQMinSpec {
    hubConnection: any;
    signalR: any;
    fn: any;
}
declare var window: WindowExtend;

@Injectable()
export class JQueryService {
	
    private _$666: JQMinSpec;
    JQueryOK: boolean;
	private outer_windowObj: WindowExtend;
    //constructor( @Inject(WindowExtend) private outer_windowObj: WindowExtend) {
	constructor() {
		
        this.JQueryOK = false;
		
        if (window) {            
			this.outer_windowObj=window;
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


