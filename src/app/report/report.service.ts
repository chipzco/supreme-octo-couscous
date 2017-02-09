import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Video } from './videos/video';
import { Study } from './studies/study';
import { VideoStudy } from './video-study/video-study';
import { Language } from './videos/video';
import { patact } from './videos/video';
import { AppSettings } from '../app-settings';

@Injectable()
export class ReportService {
    //private videosUrl = 'http://localhost:8000/api/video/list';  // URL to web api
	//private videosUrl = 'http://localhost:8000/api/video';  // URL to web api
    //private langUrl = 'http://localhost:8000/api/lang'
   //private videosUrl = 'web/api/video';  // URL to web api
    //private langUrl = 'web/api/lang'
    private videosUrl = AppSettings.API_VIDEO;
    private langUrl = AppSettings.API_LANG;
    private studyUrl = AppSettings.API_STUDY;
    constructor(private http: Http) { }
	
    private videoCache: Video[];
    private langCache: Language[];
    private studyCache: Study[];

    getVideos(): Observable<Video[]> {
        let videos_obs = this.http.get(this.videosUrl).map(response => response.json().data as Video[]).catch(this.handleError2).publishLast().refCount();	
        videos_obs.subscribe(videos => this.videoCache = videos,e=>console.log(e));		
        return videos_obs;
    }
	getVideosCached(): Video[] {		
		return this.videoCache;
    }
    getLangsCached(): Language[] {
        return this.langCache;
    }
    getVideo(id: number): Observable<Video> {        
        let video_obs = this.http.get(this.videosUrl+'/'+ id).map(response => response.json().data as Video).catch(this.handleError2);
        return video_obs;
    }

    postVideo(video: Video): Observable<any> {
        let saveObs: Observable<any>;
        if (video.id > 0) 
            saveObs = this.http.put(this.videosUrl + '/' + video.id, video).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        else
            saveObs = this.http.post(this.videosUrl, video).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        saveObs.subscribe(a => this.videoCache = null, e => console.log(e));
        return saveObs;
    }
    deleteVideo(id: number): Observable<any> {
        let delObs: Observable<any> = this.http.delete(this.videosUrl + '/' + id).map(resp => resp.json()).catch(this.handleError2).publish().refCount();
        delObs.subscribe(a => this.videoCache = null,e=>console.log(e));
        return delObs;
    }
    getLangs(): Observable<Language[]> {        
        let lang_obs = this.http.get(this.langUrl).map(response => response.json().data as Language[]).catch(this.handleError2).publishLast().refCount();		
        lang_obs.subscribe(langs => this.langCache = langs,err=>console.log(err.json()));
        return lang_obs;
    }

    private handleError2(error: any): Observable<any> {
        //console.error('An error occurred', error); // for demo purposes only
        
        if (error instanceof Response) {
            //return Observable.throw(error.json().error || 'backend server error');
            // if you're using lite-server, use the following line
            // instead of the line above:
            //return Observable.throw(error.text() || 'backend server error');            
            return Observable.throw(error || 'backend RESPONSE server error');
        }     
        else    
            return Observable.throw(error || 'backend server error');
    }

    getStudy(id: number): Observable<Study> {
        let study_obs = this.http.get(this.studyUrl + '/' + id).map(response => response.json().data as Study).catch(this.handleError2);
        return study_obs;
    }
    postStudy(study: Study): Observable<any> {
        let saveObs: Observable<any>;
        if (study.id > 0)
            saveObs = this.http.put(this.studyUrl + '/' + study.id, study).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        else
            saveObs = this.http.post(this.studyUrl, study).map(response => response.json()).catch(this.handleError2).publishLast().refCount();
        saveObs.subscribe(a => this.studyCache = null, a => console.log(a));
        return saveObs;
    }
    deleteStudy(id: number): Observable<any> {
        let delObs: Observable<any> = this.http.delete(this.studyUrl + '/' + id).map(resp => resp.json()).catch(this.handleError2).publish().refCount();
        delObs.subscribe(a => this.studyCache = null, e => console.log(e));
        return delObs;
    }

    getStudiesCached(): Study[] {
        return this.studyCache;
    }
    getStudies(): Observable<Study[]> {
        let study_obs = this.http.get(this.studyUrl).map(response => response.json().data as Study[]).catch(this.handleError2).publishLast().refCount();		
        study_obs.subscribe(s => this.studyCache = s, e => console.log(e));
        return study_obs;
    }
    getVideoStudy(id: number): Observable<VideoStudy> {
        let video_obs = this.http.get(this.videosUrl + '/' + id).map(response => response.json().data as VideoStudy).catch(this.handleError2);
        return video_obs;
    }
}
