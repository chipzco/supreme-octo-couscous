import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class WatcherService {    
    private _watchAllTurns: Subject<number>;

    watchesSet: number;
    constructor() { this.watchesSet = 0; this._watchAllTurns = new Subject<number>(); }

 
    
    get watchAllTurns(): Observable<number> {
        return this._watchAllTurns.asObservable().share();
    }


    addValWatchAllTurns(th: number) {
        this.watchesSet++;
        this._watchAllTurns.next(th);
    }

}
