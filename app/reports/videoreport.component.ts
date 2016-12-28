import { Component, Output, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from './video.service';
import { Observable, Subscription } from 'rxjs/Rx';
@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'videoreport.component.html'	
})


export class VideoReportComponent implements OnInit, OnDestroy {
    private sus: Subscription;
    constructor(private videoservice: VideoService) { }    
    vids: any;
    pollCount: number;
    aIndex: number;
	ngOnInit(): void {		
        console.log('in reports');
        this.updcounters();
    }
    updcounters(): void {
        this.pollCount = this.videoservice.pollCount;
        this.aIndex = this.videoservice.aIndex;
        /* if (this.pollCount > 5)
            this.stopObserving();*/
    }
    getVideos($event: MouseEvent): void {
        this.sus = this.videoservice.getVideos().subscribe(a => { this.updcounters(); this.vids = a; }, (e) => { console.log("ERROR:" + e); console.log(this.videoservice.errtxt); });        
        $event.preventDefault();
        console.log($event);
    }
    stopObserving(): void {
        if (this.sus)
            this.sus.unsubscribe();
    }

    ngOnDestroy() {
        if (this.sus)
            this.sus.unsubscribe();
    } 	
}





