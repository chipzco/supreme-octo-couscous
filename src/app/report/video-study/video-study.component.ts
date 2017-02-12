import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video, Language } from './../videos/video';
import { patact } from '../videos/video';
import { Study } from './../studies/study';
import { VideoStudy } from './video-study';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';


const enum remoteCallStates {
    gotVideo,
    gotStudies,
    gotVideoStudy
}


@Component({
  selector: 'app-video-study',
  templateUrl: './video-study.component.html',
  styleUrls: ['./video-study.component.scss']
})

export class VideoStudyComponent implements OnInit {
    MAX_EVENTS: number=2;
    videoStudy: VideoStudy;
    studies: Study[];
    video: Video;
    remotecalls: Array<remoteCallStates>;
    remotePrefill: boolean;
    submitted: boolean;
    constructor(private videoservice: ReportService, private route: ActivatedRoute) {
        this.submitted = false; this.remotePrefill = false; this.remotecalls = new Array<remoteCallStates>();
        this.video = new Video(0, "", "", patact.unassigned,0, new Language(),[]);
    }
  ngOnInit() { 
      this.videoStudy = new VideoStudy(0, '', '');
      this.studies = this.videoservice.getStudiesCached();
      this.route.params.switchMap((params: Params) => this.getVideo(+ params['videoid']))
          .subscribe(vid => { this.video = vid; this.remoteCallChecker(remoteCallStates.gotVideo) });
      this.route.params.switchMap((params: Params) => this.getVideoStudy(+params['id'])).subscribe(vs => { this.videoStudy = vs; this.remoteCallChecker(remoteCallStates.gotVideoStudy) });
      this.videoservice.getStudies().subscribe(s => { this.studies = s; this.remoteCallChecker(remoteCallStates.gotStudies); });
  }

  private getVideo(videoid: number): Observable<Video> {     
      if (videoid) {          
          return this.videoservice.getVideo(videoid);
      }
      return Observable.of<Video>(this.video);
  }

  private getVideoStudy(id?: number): Observable<VideoStudy>{
      if (!(id !== null && id >0))
          return Observable.of<VideoStudy>(this.videoStudy);
      this.remotePrefill = true; //need to prefill dropdown      
      return this.videoservice.getVideoStudy(id);
  } 

    

  private remoteCallChecker(newstate: remoteCallStates): void {
      this.remotecalls.push(newstate);
      if (this.remotecalls.length >= this.MAX_EVENTS && this.remotePrefill && this.remotecalls.findIndex(val => val == remoteCallStates.gotStudies) >= 0 && this.remotecalls.findIndex(val => val == remoteCallStates.gotVideoStudy) >= 0 ) {
          this.setDefStudy();
          this.remotecalls = [];//empty array. since no longer needed and no need to set defstudy anymore
      }
  }
  private setDefStudy(): void {
      if (this.videoStudy.study && this.videoStudy.study.id) {
          let selStudy = this.studies.filter(c => c.id == this.videoStudy.study.id)[0];
          if (selStudy)
              this.videoStudy.study = selStudy;
      }
  }

  onSubmit(): void {
      this.submitted = true;
  }

}
