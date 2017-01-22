import { Component, OnInit  } from '@angular/core';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';

@Component ({
	selector: 'video-form',
	moduleId: module.id.toString(),
    templateUrl: './video-form.component.html' ,
    styleUrls: ['./videos.component.scss']
})


export class VideoFormComponent implements OnInit { 
    patlabels: Array<string>;
    video: Video;
    ngOnInit(): void {
        console.log('start init comp');
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.video = new Video(0, '', '',null, 0, new Language(), []);
    }	
    submitted = false;
    onSubmit() { this.submitted = true; }

 }