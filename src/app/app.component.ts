import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'my-app',
  moduleId: module.id.toString(), 
  templateUrl: './app.component.html',
	
})
export class AppComponent  { name = 'Angular'; 

	constructor(private authService: AuthService) {}

}
