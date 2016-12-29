import { Injectable, Inject } from '@angular/core';


export class WindowExtend extends Window {
    $: JQMinSpec;  
}

export interface JQMinSpec {
    hubConnection: any;
    signalR: any;
    fn: any;
}

export class myFu implements JQMinSpec {
    hubConnection(): void {
        console.log("IT is fucked!" );
    };
    signalR: any={ name: 'fu', connectionState: { info: 'none' }  
    }
    fn: any={
        jquery : "fu"
    }
}

@Injectable()
export class JQueryService {
    private _$666 : JQMinSpec;
    JQueryOK: boolean;
    constructor( @Inject(WindowExtend) private outer_windowObj: WindowExtend) {
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
    get JQuery(): any {
        return <any>this._$666;
    }     
}


