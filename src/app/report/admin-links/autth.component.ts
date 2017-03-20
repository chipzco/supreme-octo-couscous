import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({  
  styleUrls: ['./admin-links.component.scss'],
  template: `
		<div class="container">	
			<h3>Study Video Management</h3>
			<div *ngIf="!auth.authenticated()">
				<div>You Need to Login to access this feature. </div>
				<button class="btn btn-primary btn-margin" (click)="auth.login()">Log In</button>
			</div>	
			 <div *ngIf="auth.authenticated()">	
				<button class="btn btn-primary btn-margin" (click)="auth.logout()">Log Out</button>
			 </div>
		</div>	 
			 
			 
			 
			 
			 `
  
})
export class AuthComponent  {
  constructor(private auth: AuthService) { }  
}
