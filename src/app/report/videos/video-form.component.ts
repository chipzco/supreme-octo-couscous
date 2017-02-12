import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';


const vid_Saved_Text = "The video is being saved to the database. Please wait...";
const vid_FinSaved_Text = "Finished saving video in database repository";

@Component ({
	selector: 'video-form',
	moduleId: module.id.toString(),
    templateUrl: './video-form.component.html' ,
    styleUrls: ['./videos.component.scss']
})


export class VideoFormComponent implements OnInit { 
    patlabels: Array<string>;
    langs: Array<Language>;
    progress: number= 0;
    video: Video;
    gotData: Array<string>;
	rowrepeat:2;
	selrep: Array<number>;
	selOptions: Array<number>;
    selOptionNum: number;
    loadTexts: LoaderTexts;
    showVideoStudyBtn: boolean;
    private MAX_EVENTS: number = 2; //two calls to api must complete before form is ready.
    private starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>(); //start stop fake loader
    constructor(private videoservice: ReportService, private route: ActivatedRoute) { this.showVideoStudyBtn = false;   }
    ngOnInit(): void {
        console.log('start init comp');
        this.gotData = new Array<string>();
        this.initTranscriptDrops();
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.video = new Video(0, '', '', patact.unassigned, 0, new Language(), []);
        this.loadTexts = new LoaderTexts(vid_Saved_Text, vid_FinSaved_Text);
        this.route.params
            .switchMap((params: Params) => +params['id'] ? this.videoservice.getVideo(+params['id']) : Observable.of<Video>(this.video))
            .subscribe(hero => { this.video = hero; this.changeGotData('gotvideo'); });
        this.langs = this.videoservice.getLangsCached();
        if (this.langs == null)
            this.videoservice.getLangs().subscribe(langs => { this.langs = langs; this.changeGotData('gotlangs'); }, err => this.errorPosting(err));
        else 
            this.changeGotData('gotlangs');             
    }
    get startStop(): Observable<LoaderStatus> {
        return this.starStop_s.asObservable();
    }
    initTranscriptDrops(): void {
        this.selrep = [0];
        this.selOptionNum = 0;
        this.selOptions = [0];
    }

    addRow(): void {
        let isTransSet: boolean = true;
        for (let x = 0; x < this.selrep.length; x++) {
            if (this.selrep[x] == 0) {
                isTransSet = false;
                alert("Please set language on dropdown(s) first before adding new one");
                break;
            }            
        }
        if (isTransSet) {
            this.selOptions.push(++this.selOptionNum);
            this.selrep.push(0);    
        }
    }
    removeRow(): void {
        let lastnum = this.selOptions.pop(); //take out the last number in array used to dynamically get dropdowns
        this.selOptionNum--;  //decrease the value of the number 
        this.selrep.splice(this.selrep.length - 1, 1); //remove the last element of  model value array        
    }
    delTranscript(ix: number): void {
        this.video.transcripts.splice(ix, 1);
    }


    /* do not use */
    addTrans(val: number): void {
        console.log(val);
    }
    checkLoader(): void {
        this.starStop_s.next(LoaderStatus.Start); //start         
    }
    stopLoader(): void {
        this.starStop_s.next(LoaderStatus.Stop); //start    
        this.showVideoStudyBtn = true;     
    }
	
    /**
     * Must get both video and all languages langs may or may not be observable (sometimes cached)        
     * @param newstate
     */
    public dataReady(): boolean {
        return (this.gotData.length == this.MAX_EVENTS);
    }

    private changeGotData(newstate: string): void {
        this.gotData.push(newstate);
        if (this.dataReady()) {
            this.setDefVideoLanguage();
        }        
    }
    private setDefVideoLanguage(): void {
        if (this.video.language && this.video.language.id) {
            let selVideoLang = this.langs.filter(c => c.id == this.video.language.id)[0];
            if (selVideoLang)
                this.video.language = selVideoLang;
        }
    }
    submitted = false;
    onSubmit() {
        if (!this.submitted) {
            this.submitted = true;
            this.checkLoader(); //start 
            for (let x = 0; x < this.selrep.length; x++) {
                if (this.selrep[x] != 0) {
                    let lang: Language = this.langs.find(a => a.id == this.selrep[x]);                    
                    if (lang && this.video.transcripts.findIndex(a => a.id == this.selrep[x]) == -1)
                        this.video.transcripts.push(lang);
                }
            }                
            let obsPosted: Observable<any> = this.videoservice.postVideo(this.video);
            obsPosted.subscribe(data => this.finishPosting(data), e => this.errorPosting(e));
        }
    }

    errorPosting(e: any): void {
        console.log(e);
        this.loadTexts = new LoaderTexts(vid_Saved_Text, vid_FinSaved_Text,e.toString());
        this.starStop_s.next(LoaderStatus.Error);
    }
    finishPosting(data: Video): void {
        console.log(data);
        this.initTranscriptDrops();        
        //this.submitted = false;
        //this.video = new Video(0, '', '', patact.unassigned, 0, new Language(), []);
        //let tmptranscripts = this.copyTranscripts(data.transcripts);
        //console.log(tmptranscripts);
        this.video.id = data.id;        
        this.stopLoader();   
    }
    copyTranscripts(trans: Array<Language>): Array<Language> {
        let tcopy = Array<Language>();
        let doPop: boolean = true;
        while (doPop) {
            let t = trans.pop();            
            if (t)
                tcopy.push(t);
            else
                doPop = false;
        }
        return tcopy;
    }
 }