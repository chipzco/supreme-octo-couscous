import { Component } from '@angular/core';
import { myService } from './my-service';
import { Router, ActivatedRoute, Params, UrlSegment, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';  
@Component({
  selector: 'my-app',  
  moduleId: module.id.toString(),
  templateUrl: './app.component.html' 
})
export class AppComponent  { 
	mynum:  number;
	name = 'Oct';
	currPath: string="hmm";
	crumbs: Array<string>;
	constructor(public myservice: myService, private r: ActivatedRoute, private router: Router) {
		this.mynum=myservice.checknum();		
		this.crumbs=[];
		//this.currPath=r.url;
		// r.url.subscribe((s:UrlSegment[]) => { console.log("url", s); this.currPath=s[0].path; console.log(this.currPath);});	
			
	}

	setMyUrlState(url: string): void  {
		if (this.crumbs.length >3)
			this.crumbs=[];
		this.crumbs.push(url);
		this.currPath=url;
		console.log(url);
	}	
	
	
	
	ngOnInit() {		
		//this.router.events.filter(event => event instanceof NavigationEnd).map(url=>url.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  			
		let retNav: Observable<NavigationEnd>=this.router.events.filter(event => event instanceof NavigationEnd);
		retNav.map(e=>e.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  		
	}
	
	
}
