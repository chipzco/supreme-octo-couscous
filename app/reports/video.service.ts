import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
@Injectable()
export class VideoService {
    public name: string = 'Injected Service';
    private url: string = 'http://medialib.proph.web/?act=videoang.index.public';
    private headers = new Headers({ 'Content-Type': 'application/json', "Accept": "application/json" });
    constructor(private http: Http) { }

    getVideos(): Observable<Response> {
        let myob: Observable<Response>=this.http.get(this.url, { headers: this.headers }).map(response => response.json());		
        return myob ;
    }   

}