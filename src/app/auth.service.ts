// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, NavigationEnd,NavigationStart } from '@angular/router';
import { IsAppLive } from './app-settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0  
  lock = new Auth0Lock('2z1Xd3I3gIIoy6DCTvog0e4hz7VNBo71', 'compwebserv.auth0.com', {
	auth: {
      redirect: !IsAppLive
    }
  });
  constructor(public router: Router) {
		this.lock.on("authenticated", (authResult) => { localStorage.setItem('id_token', authResult.idToken); 
	 });
	 /*
	 this.router.events
		.filter(event => event instanceof NavigationEnd)
		.filter(event => (/access_token|id_token|error/).test(event.url))
		.map(event=>{ 
			let subs=event.url;
			let x = subs.indexOf("#");
			if (x > -1) 
				subs=subs.substr(x,subs.length-x);
			console.warn("found x" + x);
			return subs;
		  }	
		)	
		.subscribe(url => {
		  this.lock.resumeAuth(url, (error, authResult) => {
			if (error) return console.log(error);
			localStorage.setItem('id_token', authResult.idToken);
			console.log("inside of lock resume " + authResult.idToken);
			//this.router.navigate(['/reports']);
		  });
		});	*/
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  }
}