import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { VideoStudy } from './video-study';
import { ReportService } from '../report.service';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';
const delvs_processRunningText = "Please wait while the video study is being deleted from the database repository";
const delvs_processFinishedText = "Finished deleting video study from database repository";
const delvs_errorText = "Could not DELETE the video study from database. Server Error";
const vs_processRunningText = "Please wait while the video-studies are being loaded from the database repository";
const vs_processFinishedText = "Finished loading video-studies from database repository";
const vs_errorText = "Could not load the video-studies from database. Server Error";


@Component ({
	selector: 'video-study-list',	
    templateUrl: './video-study-list.component.html',    
})

export class VideoStudyListComponent implements OnInit {
    @Input() videoid: number;    //pass video id from parent
    @Input() selvsid: number; //the selected video study (highlight it)
    @Input() eventGetList: Observable<number>; //observable that can contain video id as value
    @Output() eventEditLink: EventEmitter<VideoStudy> = new EventEmitter<VideoStudy>();
    videoStudies: Array<VideoStudy>;
    loadTexts: LoaderTexts;
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>();
    private deleteid: number;
    constructor(private videoservice: ReportService) {
        this.videoStudies = new Array<VideoStudy>();
        this.selvsid = 0;
        this.loadTexts = new LoaderTexts(vs_processRunningText, vs_processFinishedText, vs_errorText);        
    }
    get startStop(): Observable<LoaderStatus> {
        return this.starStop_s.asObservable();
    }
    ngOnInit(): void {
        let obs: Observable<Array<VideoStudy>> = new Observable<Array<VideoStudy>>();
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        if (this.videoid && this.videoid > 0)
            obs=this.videoservice.getVideoStudies(this.videoid);        
        else 
            obs=this.eventGetList.switchMap(id => this.onMapGetId(id));    
        obs.subscribe(vs => this.setVideoStudiesInList(vs));
    }
    private onMapGetId(vid: number): Observable<Array<VideoStudy>> {        
        this.videoid = vid;     
        return this.videoservice.getVideoStudies(vid);
    }

    onEventEdit(evt: any, vs: VideoStudy): void {
        evt.preventDefault();
        this.eventEditLink.emit(vs);
    }
    onSetDelete(id: number): void {
        this.deleteid = id;
    }
    checkAction(yesno: boolean) {
        console.log(yesno);
        if (yesno && this.deleteid)
            this.onDelete(this.deleteid);
    }
    private onDelete(id: number): void {        
        this.loadTexts = new LoaderTexts(delvs_processRunningText, delvs_processFinishedText, delvs_errorText);        
        setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 1);
        this.videoservice.deleteVideoStudy(id).subscribe(a => this.afterDelete(a), e => this.starStop_s.next(LoaderStatus.Error));
    }
    private afterDelete(data: any) {
        this.videoservice.getVideoStudies(this.videoid).subscribe(vs => this.setVideoStudiesInList(vs));
    }
    private setVideoStudiesInList(vs: VideoStudy[]): void {                   
        this.starStop_s.next(LoaderStatus.Stop); //finish    
        this.videoStudies = vs;
    }
 }