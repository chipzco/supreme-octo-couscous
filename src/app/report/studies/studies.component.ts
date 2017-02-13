import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { sortFn, sortClass } from '../sort-fn';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';
import { Study } from './study';
import { WatcherService } from '../../watcher.service';
const del_processRunningText = "Please wait while the study is being deleted from the database repository";
const del_processFinishedText = "Finished deleting study from database repository";
const del_errorText = "Could not DELETE the study from database. Server Error";
const stud_processRunningText = "Please wait while the studies are being loaded from the database repository";
const stud_processFinishedText = "Finished loading studies from database repository";
const stud_errorText = "Could not load the studies from database. Server Error";




@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {
    studies_obs: Observable<Array<Study>>;
    studies_orig: Array<Study>;        
    sortComp: sortFn;
    private deleteid: number;
    hideWhenRunning: boolean;
    IsAdmin: boolean;
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>();
    loadTexts: LoaderTexts;   


    constructor(private reportservice: ReportService, private router: Router, private watcherservice: WatcherService) {
        this.IsAdmin = false;
    }

    get startStop(): Observable<LoaderStatus> {
        return this.starStop_s.asObservable();
    }


    ngOnInit() {
        this.hideWhenRunning = false;
        this.sortComp = new sortFn("protocol,cRO,startDate,dueDate", "CHAR,CHAR,DATE,DATE", 0, false);
        this.studies_orig = this.reportservice.getStudiesCached();
        this.loadTexts = new LoaderTexts(stud_processRunningText, stud_processFinishedText, stud_errorText);
        if (this.studies_orig == null)
            this.getStudiesBackEnd();
        this.watcherservice.isAdmin.subscribe(val => this.IsAdmin = val);
    }    
    getStudiesBackEnd() {
        this.loadTexts = new LoaderTexts(stud_processRunningText, stud_processFinishedText, stud_errorText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        this.reportservice.getStudies().subscribe(s => this.setStudiesInList(s), err => this.setListError(err));
    }
    private setStudiesInList(studies: Study[]) {
        this.studies_orig = studies;
        this.hideWhenRunning = false;
        this.starStop_s.next(LoaderStatus.Stop); //finish    
    }
    private setListError(e: any) {
        this.starStop_s.next(LoaderStatus.Error); //finish    
    }


    private onDelete(id: number): void {
        this.loadTexts = new LoaderTexts(del_processRunningText, del_processFinishedText, del_errorText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        this.reportservice.deleteStudy(id).subscribe(a => this.afterDelete(a), e => this.starStop_s.next(LoaderStatus.Error));
    }
    private afterDelete(data: any) {
        this.reportservice.getStudies().subscribe(s => this.setStudiesInList(s));
    }
    onSetDelete(id: number): void {
        this.deleteid = id;
        console.log(id);
    }
    checkAction(yesno: boolean) {
        console.log(yesno);
        if (yesno && this.deleteid)
            this.onDelete(this.deleteid);
    }


    onSort(sortIndex: number): void {
        let rev: boolean = false;
        //flip direction sort 
        if (this.sortComp.currSort == sortIndex)
            rev = this.sortComp.flipSort();
        this.studies_orig = this.sortComp.sort<Study>(this.studies_orig, sortIndex, rev);
    }
}
