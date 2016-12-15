import { Component, OnInit } from '@angular/core';
import { Deal } from './deal';
// We haven't defined these services yet
import { AuthService } from './auth.service';
import { DealService } from './deal.service';

@Component({
  selector: 'public-deals' ,
  moduleId: module.id.toString(),	
  // We'll use an external file for both the CSS styles and HTML view
  templateUrl: 'private-deals.component.html',
  styleUrls: ['public-deals.component.css']
})
export class PrivateDealsComponent implements OnInit {
  privateDeals: Deal[];

  // Note: We haven't implemented the Deal or Auth Services yet.
  constructor(
    private dealService: DealService,
    private authService: AuthService) {
  }
  // When this component is loaded, we'll call the dealService and get our public deals.
  ngOnInit(): void {
    this.dealService.getPrivateDeals().then(deals => this.privateDeals = deals ).catch(e=>{ console.error('error fetching deals', e); });
  }

  purchase(item: Deal){
    alert("You bought the: " + item.name);
  }
}