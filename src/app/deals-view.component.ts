import { Component, Input } from '@angular/core';
import { Deal } from './deal';


@Component({
  selector: 'deals',
  moduleId: module.id.toString(),	
  // We'll use an external file for both the CSS styles and HTML view
  templateUrl: 'deals-view.component.html',
  styleUrls: ['public-deals.component.css']
})
export class DealsViewComponent  {
	@Input() deals: Deal[];   
    purchase(item: Deal){
		alert("You bought the: " + item.name);
	 }
}