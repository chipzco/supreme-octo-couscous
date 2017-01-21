import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
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
    constructor(private reportservice: ReportService) { }
    videos_obj: Observable<Array<Video>>;
    videos_orig: Array<Video>;
    patlabels: Array<string>;
    sortComp: sortFn;
    ngOnInit() {
        this.reportservice.getVideos().subscribe(videos => this.videos_orig = videos);
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.sortComp = new sortFn("videoid,filename,subjectname,patientact", "NUM,CHAR,CHAR,NUM", 0, false);
    }


    onSort(sortIndex: number): void {
        let rev: boolean = false;
        //flip direction sort 
        if (this.sortComp.currSort == sortIndex)
            rev = this.sortComp.flipSort();

        this.videos_orig = this.sortComp.sort<Video>(this.videos_orig, sortIndex, rev);
    }


}
