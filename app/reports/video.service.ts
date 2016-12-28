import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';


@Injectable()
export class VideoService {
    public name: string = 'Injected Service';
    private url: string = 'http://medialib.proph.web/?act=videoang.index.public';   
    private headers = new Headers(); 
    public pollCount: number=-1;
    public aIndex: number = -1;
    private stopPolling: Subject<boolean>;
    private _errtxt: any;
    constructor(private http: Http) {
        this.stopPolling = new Subject();
        this._errtxt = "";
        //{ , "Accept": "application/json" });
        this.headers.append("Content-Type": "application/json");
        this.headers.append("Accept", "application/json");
    }
    getObsVid(val: number, ix: number): Observable<any> {
        this.pollCount = val;
        this.aIndex = ix;        
        if (this.pollCount > 5)
            this.stopPolling.next(true);  //retryWhen(error => error.delay(200)).timeout(1500).
        return this.http.get(this.url, { headers: this.headers }).catch((err: any) => Observable.throw(err)).map((resp: Response) => resp.json());
    }

    getVideos(): Observable<Response> {
        this._errtxt = "";
        //let myob: any = Observable.            
        //return Observable.interval(10000).switchMap((val, index) => { this.pollCount = val; this.aIndex = index; return this.http.get(this.url, { headers: this.headers }).map((res: Response) => res.json()) });
        return Observable.interval(2000).switchMap((val,ix)=>this.getObsVid(val,ix)).takeUntil(this.stopPolling);
    }     
    get errtxt(): any {
        return this._errtxt;
    }
}