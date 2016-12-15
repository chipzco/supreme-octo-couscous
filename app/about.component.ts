import { Component } from '@angular/core';


@Component ({
	selector: 'about',
	moduleId: module.id.toString(),
	templateUrl: './about.html'
})


export class AboutComponent { 

	clicked: number; 
	
	onClick(): void  {
		this.clicked++;
		let x: number=this.clicked -10;
		console.log(x);
	}

 }