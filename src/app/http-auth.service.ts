import { Injectable } from '@angular/core';
import { IsAppLive } from './app-settings';
import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpAuthService {

  constructor(private http: Http, private authHttp: AuthHttp) { }
  
  get(url: string): Observable<Response> {
	  if (IsAppLive)
		  return this.authHttp.get(url);
	  else 
		return this.http.get(url);	
  }
  
  put(url: string, obj: any): Observable<Response> {
	  if (IsAppLive)
		  return this.authHttp.put(url,obj);
	  else 
		return this.http.put(url,obj);	
  }
  
  post(url: string,obj: any): Observable<Response> {
	  if (IsAppLive)
		  return this.authHttp.post(url,obj);
	  else 
		return this.http.post(url,obj);	
  }
  
  delete(url: string): Observable<Response> {
	  if (IsAppLive)
		  return this.authHttp.delete(url);
	  else 
		return this.http.delete(url);	
  }
 
}
