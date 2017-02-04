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
    //private videosUrl = 'http://localhost:8000/api/video/list';  // URL to web api
	private videosUrl = 'http://localhost:8000/videoapi';  // URL to web api
    private langUrl = 'http://localhost:8000/langapi'
   //private videosUrl = 'web/videoapi';  // URL to web api
   //private langUrl = 'web/langapi'
    
	
    constructor(private http: Http) { }
	
    private videoCache: Video[];
    private langCache: Language[];
    getVideos(): Observable<Video[]> {
        let videos_obs = this.http.get(this.videosUrl).map(response => response.json().data as Video[]).catch(this.handleError2).publishLast().refCount();
		/*let myp=this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);*/
        videos_obs.subscribe(videos => this.videoCache = videos);		
        return videos_obs;
    }
	getVideosCached(): Video[] {		
		return this.videoCache;
    }
    getLangsCached(): Language[] {
        return this.langCache;
    }
    getVideo(id:number): Observable<Video> {
        let video_obs = this.http.get(this.videosUrl+'/'+ id).map(response => response.json().data as Video).catch(this.handleError2);
        return video_obs;
    }

    postVideo(video: Video): Observable<any> {
        let saveObs: Observable<any>;
        if (video.id > 0) 
            saveObs = this.http.put(this.videosUrl + '/' + video.id, video).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        else
            saveObs = this.http.post(this.videosUrl, video).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        saveObs.subscribe(a => this.videoCache = null);
        return saveObs;
    }
    deleteVideo(id: number): Observable<any> {
        let delObs: Observable<any> = this.http.delete(this.videosUrl + '/' + id).map(resp => resp.json()).catch(this.handleError2).publish().refCount();
        delObs.subscribe(a => this.videoCache = null);
        return delObs;
    }
    getLangs(): Observable<Language[]> {        
        let lang_obs = this.http.get(this.langUrl).map(response => response.json().data as Language[]).catch(this.handleError2).publishLast().refCount();;		
        lang_obs.subscribe(langs => this.langCache = langs);
        return lang_obs;
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
