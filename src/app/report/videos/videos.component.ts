import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { sortFn, sortClass } from '../sort-fn';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';
import { WatcherService } from '../../watcher.service';


const del_processRunningText= "Please wait while the video is being deleted from the database repository";
const del_processFinishedText="Finished deleting video from database repository";
const del_errorText = "Could not DELETE the video from database. Server Error";
const vid_processRunningText= "Please wait while the videos are being loaded from the database repository";
const vid_processFinishedText= "Finished loading videos from database repository";
const vid_errorText = "Could not load the videos from database. Server Error";


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    constructor(private reportservice: ReportService, private router: Router, private watcherservice: WatcherService) {
        this.IsAdmin = false;    
    }
    videos_obj: Observable<Array<Video>>;
    videos_orig: Array<Video>;
    patlabels: Array<string>;
    sortComp: sortFn;
    private deleteid: number;
    hideWhenRunning: boolean;
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>();
    loadTexts: LoaderTexts;
    IsAdmin: boolean;
    ngOnInit() {
        //this.reportservice.getVideos().subscribe(videos => this.videos_orig = videos);
        this.watcherservice.isAdmin.subscribe(val => this.IsAdmin = val);
        this.hideWhenRunning = false;        
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.sortComp = new sortFn("videoid,filename,subjectname,patientact", "NUM,CHAR,CHAR,NUM", 0, false);
        this.videos_orig = this.reportservice.getVideosCached();        
        this.loadTexts = new LoaderTexts(vid_processRunningText, vid_processFinishedText);
        if (this.videos_orig == null)
            this.getVideosBackEnd();                
    }
    get startStop(): Observable<LoaderStatus> {
        return this.starStop_s.asObservable();
    }

    getVideosBackEnd() {
        this.loadTexts = new LoaderTexts(vid_processRunningText, vid_processFinishedText, vid_errorText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        this.reportservice.getVideos().subscribe(videos => this.setVideosInList(videos), err => this.setListError(err));
    }

    get diagnostic() { return JSON.stringify(this.loadTexts); }

    private setVideosInList(videos: Video[]) {
        this.videos_orig = videos;
        console.log("Admin: " + this.IsAdmin);
        this.hideWhenRunning = false;
        this.starStop_s.next(LoaderStatus.Stop); //finish    
    }
    private setListError(e: any) {        
        this.starStop_s.next(LoaderStatus.Error); //finish    
    }

    onSort(sortIndex: number): void {
        let rev: boolean = false;
        //flip direction sort 
        if (this.sortComp.currSort == sortIndex)
            rev = this.sortComp.flipSort();

        this.videos_orig = this.sortComp.sort<Video>(this.videos_orig, sortIndex, rev);
    }
    private onDelete(id: number): void {
        this.loadTexts = new LoaderTexts(del_processRunningText, del_processFinishedText, del_errorText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        this.reportservice.deleteVideo(id).subscribe(a => this.afterDelete(a), e => this.starStop_s.next(LoaderStatus.Error));        
    }
    private afterDelete(data: any) {               
        this.reportservice.getVideos().subscribe(videos => this.setVideosInList(videos) );		
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

}
