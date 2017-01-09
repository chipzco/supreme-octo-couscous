import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Video } from  './videos/video';
import { Language } from './videos/video';
import { patact } from './videos/video';

@Injectable()
export class ReportService {
    private videosUrl = 'http://local.hero.web/api/heroesef';  // URL to web api
    constructor(private http: Http) { }

    getVideos(): Observable<Video[]> {
        let videos_obs = this.http.get(this.videosUrl).map(response => response.json() as Video[]).catch(this.handleError2);
		/*let myp=this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);*/

        return videos_obs;
    }

    private handleError2(error: any): Observable<any> {
        console.error('An error occurred', error); // for demo purposes only
        if (error instanceof Response) {
            //return Observable.throw(error.json().error || 'backend server error');
            // if you're using lite-server, use the following line
            // instead of the line above:
            //return Observable.throw(error.text() || 'backend server error');
            return Observable.throw('backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }


}
