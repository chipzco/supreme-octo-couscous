import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'my-app',
  moduleId: module.id.toString(), 
  templateUrl: './app.component.html',
	
})
export class AppComponent  { name = 'Angular'; 
	title: string; 
	constructor(private authService: AuthService) { this.title="WTF!!!!"; }

}
