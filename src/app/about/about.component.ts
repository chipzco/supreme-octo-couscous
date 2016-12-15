import { Component, OnInit } from '@angular/core';
declare var JQ666;		
@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
 
  constructor() {
    // Do stuff
  }

  ngOnInit(): void{
	
    console.log('Hello About');	
	
  }
  change() {
	 
	console.log(JQ666); JQ666( "button.continue" ).html( "Next Step..." ); 	

 }
}
