import { Component, OnInit, Input  } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { VideoStudy } from './video-study';
import { ReportService } from '../report.service';
@Component ({
	selector: 'video-study-list',
	moduleId: module.id.toString(),
    templateUrl: './video-study-list.component.html',    
})


export class VideoStudyListComponent implements OnInit {
    @Input() videoid: number;    //pass video id from parent
    @Input() eventGetList: Observable<number>; //observable that can contain video id as value
    videoStudies: Array<VideoStudy>;

    constructor(private videoservice: ReportService) {
        this.videoStudies = new Array<VideoStudy>();
    }

    ngOnInit(): void {
        if (this.videoid && this.videoid > 0)
            this.videoservice.getVideoStudies(this.videoid).subscribe(vs => this.videoStudies = vs);
        //this.eventGetList.switchMap(vid => this.videoservice.getVideoStudies(vid)).subscribe(vs => { this.videoStudies = vs; console.warn('hsdkfhsdkfhdskjfs') });
        this.eventGetList.subscribe(a => console.log("GOT IT : " + a));
        console.log("hrere in init");
    }

    
 }