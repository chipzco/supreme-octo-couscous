import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  moduleId: module.id.toString(),
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app works!';
	fu: string ="name";
	mynum:  number =0;
	name = 'Oct';
	currPath: string="hmm";
	crumbs: Array<string>;
	constructor(private r: ActivatedRoute, private router: Router) {		
		this.crumbs=[];
		//this.currPath=r.url;
		// r.url.subscribe((s:UrlSegment[]) => { console.log("url", s); this.currPath=s[0].path; console.log(this.currPath);});	
			
	}	
	setMyUrlState(url: string): void  {
		if (this.crumbs.length >3)
            this.crumbs = [];
        let urlc = url.replace('/', '');
        if (this.crumbs.findIndex(c=>c==urlc)== -1)
            this.crumbs.push(urlc);
        this.currPath = url;
        this.mynum = this.crumbs.length-1;
		console.log(url);
	}	
	ngOnInit() {		
		//this.router.events.filter(event => event instanceof NavigationEnd).map(url=>url.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  			
		let retNav: Observable<NavigationEnd>=this.router.events.filter(event => event instanceof NavigationEnd);
		retNav.map((e: any)=>e.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  		
	}  
}
