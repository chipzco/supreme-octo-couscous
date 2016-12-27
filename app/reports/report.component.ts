import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'report.component.html',
	styleUrls: [ 'report.component.css' ]	
})


export class ReportComponent implements OnInit {


    constructor(private videoservice: VideoService) { }
    reports: Array<string>;
    vids: any;
	ngOnInit(): void {		
        console.log('in reports');
        this.reports = ['Bank Report', 'Currency Report', 'Transaction Report', 'Study Listing', 'Video Listing'];
    }
    getVideos(): void {
        this.vids = this.videoservice.getVideos();
    }
    	
}





