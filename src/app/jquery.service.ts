import { Injectable, Inject } from '@angular/core';
import {window_cover} from './window-ref';
import { WindowExtend, JQMinSpec } from './window-extend';

@Injectable()
export class JQueryService {	
    private _$666: JQMinSpec;
    JQueryOK: boolean;	
	//constructor(@Inject(WindowExtend) private outer_windowObj: WindowExtend) {		
	constructor(private outer_windowObj: window_cover) {		
        this.JQueryOK = false;				
        if (this.outer_windowObj.g_window_ref) {            			
            if (this.outer_windowObj.g_window_ref.$) {                
                if (this.outer_windowObj.g_window_ref.$.hubConnection) {                  
                    if (this.outer_windowObj.g_window_ref.$.signalR) {                        
                        this.JQueryOK = true;
                        this._$666 = this.outer_windowObj.g_window_ref.$;                        
                    }
                }
            }
        }   
		console.log(this.JQueryOK + " jq service loaded window? ")	
    }
    get JQuery(): any {
        return <any>this._$666;
    }
}


