import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Params } from '@angular/router';


export class ActivatedRouteStub {
	s_params: Subject<Params>;
	act_params: Params={};
    snapshot={};	
	constructor() {
		this.s_params=new Subject<Params>();		
		this.act_params['id']=0;
		this.act_params['videoid']=10;
		this.s_params.next(this.act_params);				
		this.snapshot.params=this.act_params;
	}
	get params(): Observable<Params> {
		return this.s_params.asObservable();
	}
	
	
}