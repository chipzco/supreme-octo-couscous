import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { IsAppLive } from './app-settings';
// Import our authentication service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (!this.auth.authenticated()) {
	  if (IsAppLive)
		this.router.navigate(['/reports', { outlets: {admin: ['auth']}} ]);	
	   else 
		 console.log("APP IS LIVE? "  + IsAppLive +  "  so not redirecting");	
      return true;
    }
    return true;
  }

}