import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { sortFn, sortClass } from '../sort-fn';

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
    deleteRunning: boolean;
    private starStop_s: Subject<boolean> = new Subject <boolean>();
    ngOnInit() {
        //this.reportservice.getVideos().subscribe(videos => this.videos_orig = videos);
        this.deleteRunning = false;
        this.videos_orig = this.reportservice.getVideosCached();
        if (this.videos_orig == null)
            this.reportservice.getVideos().subscribe(videos => this.videos_orig = videos);		
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.sortComp = new sortFn("videoid,filename,subjectname,patientact", "NUM,CHAR,CHAR,NUM", 0, false);
    }
    get startStop(): Observable<boolean> {
        return this.starStop_s.asObservable();
    }

    onSort(sortIndex: number): void {
        let rev: boolean = false;
        //flip direction sort 
        if (this.sortComp.currSort == sortIndex)
            rev = this.sortComp.flipSort();

        this.videos_orig = this.sortComp.sort<Video>(this.videos_orig, sortIndex, rev);
    }
    private onDelete(id: number): void {
        this.starStop_s.next(true); //start     
        this.deleteRunning = true;   
        this.reportservice.deleteVideo(id).subscribe(a => this.afterDelete(a));        
    }
    private afterDelete(data: any) {
        console.log(data);
        //this.router.navigate(['/about']);
        this.starStop_s.next(false);
        //i need to show new video list
        this.reportservice.getVideos().subscribe(videos => { this.videos_orig = videos; this.deleteRunning = false; });		
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
