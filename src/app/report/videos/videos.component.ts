import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { sortFn, sortClass } from '../sort-fn';
import { LoaderTexts } from '../fakeloader/loader-texts';


const del_processRunningText= "Please wait while the video is being deleted from the database repository";
const del_processFinishedText="Finished deleting video from database repository";
 
const vid_processRunningText= "Please wait while the videos are being loaded from the database repository";
const vid_processFinishedText= "Finished loading videos from database repository";



@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    constructor(private reportservice: ReportService, private router: Router) { }
    videos_obj: Observable<Array<Video>>;
    videos_orig: Array<Video>;
    patlabels: Array<string>;
    sortComp: sortFn;
    private deleteid: number;
    hideWhenRunning: boolean;
    private starStop_s: Subject<boolean> = new Subject<boolean>();
    loadTexts: LoaderTexts;   

    ngOnInit() {
        //this.reportservice.getVideos().subscribe(videos => this.videos_orig = videos);
        this.hideWhenRunning = false;        
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.sortComp = new sortFn("videoid,filename,subjectname,patientact", "NUM,CHAR,CHAR,NUM", 0, false);
        this.videos_orig = this.reportservice.getVideosCached();        
        this.loadTexts = new LoaderTexts(vid_processRunningText, vid_processFinishedText);
        if (this.videos_orig == null)
            this.getVideosBackEnd();            
    }
    get startStop(): Observable<boolean> {
        return this.starStop_s.asObservable();
    }

    getVideosBackEnd() {
        this.loadTexts = new LoaderTexts(vid_processRunningText, vid_processFinishedText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(true), 1);
        this.reportservice.getVideos().subscribe(videos => this.setVideosInList(videos));
    }

    get diagnostic() { return JSON.stringify(this.loadTexts); }

    private setVideosInList(videos: Video[]) {
        this.videos_orig = videos;
        this.hideWhenRunning = false;   
        this.starStop_s.next(false); //finish    
    }
    onSort(sortIndex: number): void {
        let rev: boolean = false;
        //flip direction sort 
        if (this.sortComp.currSort == sortIndex)
            rev = this.sortComp.flipSort();

        this.videos_orig = this.sortComp.sort<Video>(this.videos_orig, sortIndex, rev);
    }
    private onDelete(id: number): void {              
        this.loadTexts = new LoaderTexts(del_processRunningText, del_processFinishedText);
        this.hideWhenRunning = true;
        setTimeout(() => this.starStop_s.next(true), 1);
        this.reportservice.deleteVideo(id).subscribe(a => this.afterDelete(a));        
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
