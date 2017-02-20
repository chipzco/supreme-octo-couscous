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
    gotVideoStudy,
    gotVideoStudies
}


@Component({
  selector: 'app-video-study',
  templateUrl: './video-study.component.html',
  styleUrls: ['./video-study.component.scss']
})

export class VideoStudyComponent implements OnInit {
    MAX_EVENTS: number=3;
    videoStudy: VideoStudy;
    videoStudies: Array<VideoStudy>;
    studies: Study[];
    video: Video;
    remotecalls: Array<remoteCallStates>;
    remotePrefill: boolean;
    submitted: boolean;
    defvideoid: number;
    selvsid: number;    

    get emitVideoList(): Observable<number> {
        //return this.emitGetVideoList.asObservable();
        return this.route.params.map((params: Params) => +params['videoid']); 
    }
    
    constructor(private videoservice: ReportService, private route: ActivatedRoute) {
        this.submitted = false; this.remotePrefill = false; this.remotecalls = new Array<remoteCallStates>();
        this.video = new Video(0, "", "", patact.unassigned, 0, new Language(), []);
        this.videoStudies = new Array<VideoStudy>();       
        this.defvideoid = 0;
        this.selvsid = 0;
    }
  ngOnInit() { 
      this.videoStudy = new VideoStudy(0, '', '');      
      this.route.params.switchMap((params: Params) => this.onMapGetVsid(+params['id'])).subscribe(vs => this.videoStudyOnSubscribe(vs));
      this.defvideoid = +this.route.snapshot.params['videoid'];      
    }
  private onMapGetVsid(vsid?: number): Observable<VideoStudy> {
      if (vsid) {
          this.selvsid = vsid;
          return this.getVideoStudy(vsid);
      }
      return Observable.of<VideoStudy>(new VideoStudy(0, '', ''));
  }
  private getVideoStudy(id: number): Observable<VideoStudy> {
      this.remotePrefill = true; //need to prefill dropdown      
      return this.videoservice.getVideoStudy(id);
  } 
  private videoStudyOnSubscribe(vs: VideoStudy) {
      this.videoStudy = vs;      
      //console.log(vs);
      this.remoteCallChecker(remoteCallStates.gotVideoStudy);
      this.studies = this.videoservice.getStudiesCached();
      if (!this.studies)
          this.videoservice.getStudies().subscribe(s => { this.studies = s; this.remoteCallChecker(remoteCallStates.gotStudies); });
      else
          this.remoteCallChecker(remoteCallStates.gotStudies);
      if (vs.id && vs.video && vs.video.id) {
          this.remoteCallChecker(remoteCallStates.gotVideo);
          this.video = vs.video;
      }
      else          
         this.route.params.switchMap((params: Params) => this.getVideo(+ params['videoid'])).subscribe(vid => { this.video = vid; this.remoteCallChecker(remoteCallStates.gotVideo) });      
  }

  private getVideo(videoid?: number): Observable<Video> {     
      if (videoid) {          
          return this.videoservice.getVideo(videoid);
      }
      return Observable.of<Video>(this.video);
  }

  

    

  private remoteCallChecker(newstate: remoteCallStates): void {
      this.remotecalls.push(newstate);
      //console.log(this.remotecalls.length);
      //console.log("got studies" + this.remotecalls.findIndex(val => val == remoteCallStates.gotStudies) + " found video:" + this.remotecalls.findIndex(val => val == remoteCallStates.gotVideo));
      if (this.remotecalls.length >= this.MAX_EVENTS && this.remotecalls.findIndex(val => val == remoteCallStates.gotStudies) >= 0 && this.remotecalls.findIndex(val => val == remoteCallStates.gotVideoStudy) >= 0 && this.remotecalls.findIndex(val => val == remoteCallStates.gotVideo) >=0) {
          //console.warn('hi');
          if (this.remotePrefill)
            this.setDefStudy();
          this.videoStudy.video = this.video;   
          //console.log(this.videoStudy);
          this.remotecalls = [];//empty array. since no longer needed and no need to set defstudy anymore
      }
  }
  private setDefStudy(): void {
      //console.log('im herer'); 
      if (this.videoStudy.study && this.videoStudy.study.id) {
          let selStudy = this.studies.filter(c => c.id == this.videoStudy.study.id)[0];
          if (selStudy)
              this.videoStudy.study = selStudy;
      }
  }

  onSubmit(): void {
      this.submitted = true;
      this.videoservice.postVideoStudy(this.videoStudy).subscribe(a => this.postSave(a));
  }
  postSave(vs: VideoStudy): void {
      this.videoStudy = vs;
      this.videoservice.getVideoStudies(this.video.id).subscribe( (vs) => { this.videoStudies = vs; this.submitted = false; });
  }

}
