import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';  
@Injectable()
export class ObserveService {
  constructor(private http: Http) {}
  
  /*search(term: string): Observable<Hero[]> {
	return this.http
			   .get(`http://local.hero.web/api/heroesef/?name=${term}`)
			   .map((r: Response) => r.json() as Hero[]);
  }	  
  */
  /*
	runTimer(): Observable<any> {  
		console.log('Current time: ' + Date.now());
		var source = Observable.timer(0,1000).timestamp();
		//var subscription = source.subscribe(x => console.log(x.value + ': ' + x.timestamp));
		return source;
	}
	
*/
/* Output may be similar to this */
// Current time: 1382560697820
// 0: 1382560702820
// 1: 1382560703820
// 2: 1382560704820 
  
}