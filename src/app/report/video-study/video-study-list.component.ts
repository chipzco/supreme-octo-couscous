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
    @Input() selvsid: number; //the selected video study (highlight it)
    @Input() eventGetList: Observable<number>; //observable that can contain video id as value
    videoStudies: Array<VideoStudy>;

    constructor(private videoservice: ReportService) {
        this.videoStudies = new Array<VideoStudy>();
        this.selvsid = 0;
    }

    ngOnInit(): void {
        let obs: Observable<Array<VideoStudy>> = new Observable<Array<VideoStudy>>();
        if (this.videoid && this.videoid > 0)
            obs=this.videoservice.getVideoStudies(this.videoid);        
        else 
            obs=this.eventGetList.switchMap(id => this.onMapGetId(id));    
        obs.subscribe(vs => this.videoStudies = vs)
    }
    private onMapGetId(vid: number): Observable<Array<VideoStudy>> {        
        this.videoid = vid;
        console.log('swwitch map' + vid);
        return this.videoservice.getVideoStudies(vid);
    }

    
 }