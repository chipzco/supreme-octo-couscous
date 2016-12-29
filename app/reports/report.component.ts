import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { ChannelService } from '../signalR/channel.service';

@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'report.component.html',
	styleUrls: [ 'report.component.css' ]	
})


export class ReportComponent implements OnInit {


    constructor(private videoservice: VideoService, private channelservice: ChannelService) { }
    reports: Array<string>;
    vids: any;
	myjq: any;
	ngOnInit(): void {		    
        this.reports = ['Bank Report', 'Currency Report', 'Transaction Report', 'Study Listing', 'Video Listing'];
		this.myjq=this.channelservice.jq;
		console.log("JQuery version:" + this.myjq.fn.jquery);
        let jsjq: any=this.myjq; 		
		jsjq("#myButton").click(function () {
			jsjq("p").slideToggle("slow");     //cannot use this object with jquery callback.
			//console.log('aha!');				
		});
	}
    getVideos(): void {
        this.vids = this.videoservice.getVideos();
		let jsjq: any=this.myjq; 
		jsjq(".featurette").slideToggle("slow");
    }
    	
}





