import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component ({	  	
	selector: 'about',	  
	templateUrl:  './about.component.html'	
})


export class AboutComponent implements OnInit {	
	
	constructor() {  }   	
	
    ngOnInit(): void {
        this.clicked = 0;
	}
	clicked: number; 
	
	onClick(): void  {
		this.clicked++;
		let x: number=this.clicked -10;
		console.log(x);	
	}
}





