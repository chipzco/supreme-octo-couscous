import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';  
import { Injectable }     from '@angular/core';


export class RouterStub {	
	private s_events: Subject<NavigationEnd>;

	constructor() {
		this.s_events=new Subject<NavigationEnd>();
		this.s_events.next(new NavigationEnd('test'));
	}  	
	
	navigateByUrl(url: string): void {
		console.log(url);
		this.s_events.next(new NavigationEnd(url));
	}
	
	
	get events(): Observable<NavigationEnd> {
		return this.s_events.asObservable();	
	}
}

export class NavigationEnd {	
	id: number;
	url: string;
	urlAfterRedirects: string;	 
	
	
	constructor(url: string) {
		this.url=url;
		this.urlAfterRedirects=url;
        this.id=0;		
	}
}