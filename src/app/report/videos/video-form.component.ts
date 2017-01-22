import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
@Component ({
	selector: 'video-form',
	moduleId: module.id.toString(),
    templateUrl: './video-form.component.html' ,
    styleUrls: ['./videos.component.scss']
})


export class VideoFormComponent implements OnInit { 
    patlabels: Array<string>;
    video: Video;
    constructor(private videoservice: ReportService, private route: ActivatedRoute) {    }

    ngOnInit(): void {
        console.log('start init comp');
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.video = new Video(0, '', '', patact.unassigned, 0, new Language(), []);
         this.route.params
            .switchMap((params: Params) => +params['id'] ? this.videoservice.getVideo(+params['id']) : Observable.of<Video>(this.video))
            .subscribe(hero => this.video = hero);
        
    }	
    submitted = false;
    onSubmit() { this.submitted = true; }

 }