import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Params } from '@angular/router';

class myParams implements Params  {	
	constructor(public akey: string,public aval: number) { }
}


export class ActivatedRouteStub {
	s_params: Subject<Array<any>>;
	act_params: Array<any>;
	snapshot: any;
	constructor() {
		this.s_params=new Subject<Array<any>>();
		this.act_params=new Array();
		this.act_params['id']=0;
		this.act_params['videoid']=10;
		this.s_params.next(this.act_params);
		this.snapshot={};
		this.snapshot.params=this.act_params;
	}
	get params(): Observable<Array<any>> {
		return this.s_params.asObservable();
	}
	
}