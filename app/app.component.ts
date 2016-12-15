import { Component } from '@angular/core';
import { myService } from './my-service';
@Component({
  selector: 'my-app',  
  moduleId: module.id.toString(),
  templateUrl: './app.component.html' 
})
export class AppComponent  { 
	mynum:  number;
	name = 'Oct';

	
	constructor(public myservice: myService) {
		this.mynum=myservice.checknum();
	}

	
	
	
}
