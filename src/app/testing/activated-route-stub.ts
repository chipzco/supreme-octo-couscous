import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Params } from '@angular/router';


export class ActivatedRouteStub {
	s_params: Subject<Params>;
	act_params: Params={};
    snapshot: any={};	
	constructor() {
		this.s_params=new Subject<Params>();		
		this.act_params['id']=0;
		this.act_params['videoid']=666;
		this.s_params.next(this.act_params);				
		this.snapshot.params=this.act_params;
	}
	get params(): Observable<Params> {
		return this.s_params.asObservable();
	}
	setparam(key: string,value: any): void {
		this.act_params[key]=value;
	}
	activateParams(): void {
		this.s_params.next(this.act_params);				
	}	
}