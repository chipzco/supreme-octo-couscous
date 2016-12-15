
/* Import Injectable module from Angular 2 */
 
import {Injectable} from '@angular/core';
@Injectable()
export class myService {
	 public name: string = 'Injected Service';
	checknum(): number{
		let x: number;
		x=100+99-999
		
		return x;

	}	

}