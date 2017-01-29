import { Component, OnInit,Input } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { LoaderTexts } from './loader-texts';
@Component({
  selector: 'app-fakeloader',
  templateUrl: './fakeloader.component.html',
  styleUrls: ['./fakeloader.component.scss']
})

export class FakeloaderComponent implements OnInit {
    hideLoader: boolean = false;
    @Input() startStop: Observable<boolean>;    
    @Input() loadTexts: LoaderTexts;

    progress: number;
    infotext: string;
    constructor() {
        this.hideLoader = true;
        this.loadTexts = new LoaderTexts("RUNNING RUNNING!!!","Finished!!!!");        
        this.infotext = "nothing happening right now";
    }
    ngOnInit() {
        this.hideLoader = true;
        this.startStop.subscribe(a => this.processRun(a));
    }
    processRun(start: boolean): void {
        if (start)
            this.startProgress();
        else
            this.finishPosting(); 
    }
    startProgress(): void  {
        this.progress = 0;
        this.hideLoader = false;
        this.infotext = this.loadTexts.processRunningText;
        let progobs = Observable.interval(100).takeUntil(this.startStop);
        progobs.subscribe(a => this.setProgress(a));        
    }
    setProgress(x: number): void {
        this.progress = x * 100 / 50;
        if (this.progress > 100) {
            this.progress = 100;
        }
    }
    finishPosting(): void {        
        this.progress = 100;
        this.infotext = this.loadTexts.processFinishedText;
        setTimeout(() => this.hideLoader = true,500);        
    }

}
