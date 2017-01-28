import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TurnsHolder } from './knight/knight.service';


@Injectable()
export class WatcherService {
    private _watchTurnsHolder: Observable<Array<TurnsHolder>>;
    private _watchAllTurns: Subject<Array<TurnsHolder>>;

    watchesSet: number;
    constructor() { this.watchesSet = 0; this._watchAllTurns = new Subject<Array<TurnsHolder>>(); }

    set watchTurnsHolder(aWatch: Observable<Array<TurnsHolder>>) {
        this._watchTurnsHolder = aWatch;
        this.watchesSet++;
    }
    get watchTurnsHolder(): Observable<Array<TurnsHolder>> {
        return this._watchTurnsHolder;
    }


    
    get watchAllTurns(): Observable<Array<TurnsHolder>> {
        return this._watchAllTurns.asObservable().share();
    }


    addValWatchAllTurns(th: Array<TurnsHolder>) {
        this._watchAllTurns.next(th);
    }

}
