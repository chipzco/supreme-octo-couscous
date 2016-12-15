import { Component } from '@angular/core';
import { myService } from './my-service';
@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1> {{mynum}}`,
})
export class AppComponent  { 
	mynum:  number;
	name = 'Oct';

	
	constructor(public myservice: myService) {
		this.mynum=myservice.checknum();
	}

	
	
	
}
