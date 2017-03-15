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
  selector: 'app-video-try-study',
  templateUrl: './video-study-try.component.html',
  styleUrls: ['./video-study.component.scss']
})

export class VideoStudyTryComponent implements OnInit {
    MAX_EVENTS: number=3;
    videoStudy: VideoStudy;    
    studies: Study[];
    video: Video;
    remotecalls: Array<remoteCallStates>;
    remotePrefill: boolean;
    submitted: boolean;
    postSaveLinks: boolean;
    defvideoid: number;
    selvsid: number;
    error: boolean;
    emitGetVideoList: Subject<number>;
    loadTexts: LoaderTexts;
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>();
    get emitVideoList(): Observable<number> {
        return this.emitGetVideoList.asObservable();
        //return this.route.params.map((params: Params) => +params['videoid']); 
    }
    get startStop(): Observable<LoaderStatus> {
        return this.starStop_s.asObservable();
    }

    constructor(private videoservice: ReportService, private route: ActivatedRoute) {        
        this.remotePrefill = false;
        this.remotecalls = new Array<remoteCallStates>();                
        this.emitGetVideoList = new Subject<number>();
        this.loadTexts = new LoaderTexts("Saving video-study", "Finished Saving Video Study", "Error saving Video Study");        
    }
    private resetOnLoad(): void {
        this.submitted = false; 
        this.video = new Video(0, "", "", patact.unassigned, 0, new Language(), []);       
        this.remotecalls = new Array<remoteCallStates>();        
        this.defvideoid = 0;
        this.selvsid = 0;       
        this.videoStudy = new VideoStudy(0, '', '');
        this.error = false;
        this.postSaveLinks = false;
    }
    ngOnInit() {
      this.resetOnLoad();
      this.route.params.switchMap((params: Params) => this.onMapGetVsid(+params['id'], +params['videoid'])).subscribe(vs => this.videoStudyOnSubscribe(vs));
      this.defvideoid = +this.route.snapshot.params['videoid'];           
    }
   private onMapGetVsid(vsid?: number, vid?: number): Observable<VideoStudy> {
      this.resetOnLoad(); //need to reset variables if calling this again (ngOnInit is not called then)
      if (vid)
          this.defvideoid = vid;
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
      this.remoteCallChecker(remoteCallStates.gotVideoStudy);
      this.studies = this.videoservice.getStudiesCached();
      if (!this.studies)
          this.videoservice.getStudies().subscribe(s => { this.studies = s; this.remoteCallChecker(remoteCallStates.gotStudies); });
      else
          this.remoteCallChecker(remoteCallStates.gotStudies);
      if (vs.id && vs.video && vs.video.id) {
          this.remoteCallChecker(remoteCallStates.gotVideo); //got the video
          this.video = vs.video;
          //this.emitGetVideoList.next(vs.video.id); //not sure if this should be loaded again
      }
      else {
          if (this.defvideoid)
              this.getVideo(this.defvideoid).subscribe(v => this.onSubscribeVideo(v), e => this.error = true);      
     }
  }
  

  private getVideo(videoid?: number): Observable<Video> {     
      if (videoid) {          
          return this.videoservice.getVideo(videoid);
      }
      //dont have the video so this screen should be disabled somehow.
      this.error = true;
      return Observable.of<Video>(this.video);
  }
  private onSubscribeVideo(video: Video): void {
      this.video = video;
      this.remoteCallChecker(remoteCallStates.gotVideo);
      this.emitGetVideoList.next(this.video.id);
  }
  

    

  private remoteCallChecker(newstate: remoteCallStates): void {
      this.remotecalls.push(newstate);      
      if (!this.error && this.remotecalls.length >= this.MAX_EVENTS && this.remotecalls.findIndex(val => val == remoteCallStates.gotStudies) >= 0 && this.remotecalls.findIndex(val => val == remoteCallStates.gotVideoStudy) >= 0 && this.remotecalls.findIndex(val => val == remoteCallStates.gotVideo) >=0) {          
          if (this.remotePrefill)
            this.setDefStudy();
          this.videoStudy.video = this.video;             
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
      let loadingVSTxt = this.getDispSavedVS(this.videoStudy);
      this.loadTexts = new LoaderTexts(loadingVSTxt, "Finished Saving Video Study", "Error saving Video Study");
      setTimeout(() => this.starStop_s.next(LoaderStatus.Start), 0); //to activate the new loader texts
      this.videoservice.postVideoStudy(this.videoStudy).subscribe(a => this.postSave(a), e => this.starStop_s.next(LoaderStatus.Error));
  }
  private getDispSavedVS(vs: VideoStudy): string {
      let myJsObjStr = "Saving video-study info... <br/> ";
      if (vs.study && vs.study.id)
          myJsObjStr += "<br/>Study Protocol: " + vs.study.protocol;      
      myJsObjStr += "Purpose: " + vs.purpose;
      myJsObjStr += "<br/>Notes: " + vs.notes;
      myJsObjStr += "<br/>Id: " + vs.id;
      
      return myJsObjStr;
  }
  postSave(vs: VideoStudy): void {
      this.videoStudy = vs;
      this.setDefStudy();
      this.starStop_s.next(LoaderStatus.Stop); //finish    
      this.postSaveLinks = true;
      this.emitGetVideoList.next(this.video.id);
  }

  newVideoStudy(evt: any): void {
      evt.preventDefault();
      this.videoStudy = new VideoStudy(0, '', '');
      this.videoStudy.video = this.video;      
      this.remotecalls=[];
      this.defvideoid = 0;
      this.submitted = false; //turn off links show form.
      this.selvsid = 0;    
      this.postSaveLinks = false;
  }
  editVS(evt: VideoStudy): void {
      this.videoStudy = evt;
      this.remotecalls = [];
      this.defvideoid = evt.video.id;
      this.submitted = false; //turn off links show form.
      this.selvsid = evt.id;
      this.setDefStudy();
      this.postSaveLinks = false;
  }
}
