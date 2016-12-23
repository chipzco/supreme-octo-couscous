import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({	  
	moduleId: module.id,
	selector: 'report',	  
	templateUrl:  'report.component.html',
	styleUrls: [ 'report.component.css' ]	
})


export class ReportComponent implements OnInit {

    reports: Array<string>;
	ngOnInit(): void {		
        console.log('in reports');
        this.reports = ['Bank Report', 'Currency Report', 'Transaction Report', 'Study Listing', 'Video Listing'];
	}	
}





