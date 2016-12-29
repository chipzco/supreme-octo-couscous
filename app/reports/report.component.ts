import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { VideoService } from './video.service';
//import { ChannelService } from '../signalR/channel.service';
import { JQueryService, JQMinSpec } from '../jquery.service';

@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'report.component.html',
	styleUrls: [ 'report.component.css' ]	
})


export class ReportComponent implements OnInit {


    constructor(private videoservice: VideoService, private jqueryservice: JQueryService) { }  //private channelservice: ChannelService,
    reports: Array<string>;
    vids: any;
	myjq: any;
	ngOnInit(): void {		    
        this.reports = ['Bank Report', 'Currency Report', 'Transaction Report', 'Study Listing', 'Video Listing'];
        console.log(this.jqueryservice.JQueryOK);
        /*
		this.myjq=this.channelservice.jq;
		console.log("JQuery version:" + this.myjq.fn.jquery);
        let jsjq: any=this.myjq; 		
		jsjq("#myButton").click(function () {
			jsjq("p").slideToggle("slow");     //cannot use this object with jquery callback.
			//console.log('aha!');				
		});
        */
	}
    getVideos(): void {
        this.vids = this.videoservice.getVideos();

        let myjq: any = this.jqueryservice.JQuery; 
        if (myjq) {
            console.log("hello working?: " + this.jqueryservice.JQueryOK);

            //jquery
            myjq(".featurette").slideToggle("slow");
        }
        else {
            console.warn("Hello moron:" + this.jqueryservice.JQueryOK);
        }
    }
    	
}





