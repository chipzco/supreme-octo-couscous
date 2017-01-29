import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, UrlSegment, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { WatcherService } from './watcher.service';

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
    
    knightWatcherSet: boolean;
    constructor(private r: ActivatedRoute, private router: Router, private watcherservice: WatcherService) {		
        this.crumbs = [];
        this.knightWatcherSet = false;
        this.watcherservice.watchAllTurns.subscribe(a => console.log(" Length of turnsholder from app comp subscription: " + a));
		//this.currPath=r.url;
		// r.url.subscribe((s:UrlSegment[]) => { console.log("url", s); this.currPath=s[0].path; console.log(this.currPath);});	
			
	}	
	setMyUrlState(url: string): void  {
        if (this.crumbs.length > 8)
            this.crumbs.splice(0,2);
        let urlc = url.replace('/', '');
        let x = this.crumbs.findIndex(c => c == urlc);
        if (x > -1)
            this.crumbs.splice(x, 1);
        this.crumbs.push(urlc);
        this.currPath = url;
        this.mynum = this.crumbs.length - 1;
        this.getKnightWatcherData();
		console.log(url);
    }	
    getKnightWatcherData(): void {        
        console.log("knwight watches count: " + this.watcherservice.watchesSet);
    }


	ngOnInit() {		
		//this.router.events.filter(event => event instanceof NavigationEnd).map(url=>url.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  			
		let retNav: Observable<NavigationEnd>=this.router.events.filter(event => event instanceof NavigationEnd);
		retNav.map((e: any)=>e.urlAfterRedirects).subscribe(a=>this.setMyUrlState(a));  		
	}  
}
