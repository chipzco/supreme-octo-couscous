import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class WatcherService {    

    private _watchAllTurns: Subject<number>;
    private _isAdmin: Subject<boolean>;

    watchesSet: number;
    constructor() {
        this.watchesSet = 0; this._watchAllTurns = new Subject<number>();
        this._isAdmin = new Subject<boolean>();
        this._isAdmin.next(false);
    }

    get isAdmin(): Observable<boolean> {
        return this._isAdmin.asObservable().share();
    }
    set adminSite(val: boolean) {
        this._isAdmin.next(val);
    }
    
    get watchAllTurns(): Observable<number> {
        return this._watchAllTurns.asObservable().share();
    }


    addValWatchAllTurns(th: number) {
        this.watchesSet++;
        this._watchAllTurns.next(th);
    }

}
