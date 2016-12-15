import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Deal } from './deal';

@Injectable()
export class DealService {
  // Define the routes we are going to interact with
  private publicDealsUrl = 'http://localhost:3001/api/deals/public';
  private privateDealsUrl = 'http://localhost:3001/api/deals/private';
  private phpUrl='http://localhost:8000/api/ping';	
  constructor(private http: Http, private authHttp: AuthHttp) { }

  // Implement a method to get the public deals
  getPublicDeals() {
    return this.http
      .get(this.publicDealsUrl)
      .toPromise()
      .then(response=>response.json())
      .catch(this.handleError);
  }

  // Implement a method to get the private deals
  getPrivateDeals(): Promise<Array<Deal>> {
    return this.authHttp
      .get(this.privateDealsUrl)
      .toPromise()
      .then((response: Response)=>response.json())
      .catch(this.handleError);
  }

  getPHPping(): Promise<Array<any>>{
	return this.authHttp 
	.get(this.phpUrl)
      .toPromise()
      .then((response: Response) => response.json())  //
      .catch(this.handleError);  
  }
  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}