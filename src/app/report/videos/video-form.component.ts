import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
@Component ({
	selector: 'video-form',
	moduleId: module.id.toString(),
    templateUrl: './video-form.component.html' ,
    styleUrls: ['./videos.component.scss']
})


export class VideoFormComponent implements OnInit { 
    patlabels: Array<string>;
    langs: Array<Language>;
    video: Video;
    langStatus: string;
    constructor(private videoservice: ReportService, private route: ActivatedRoute) {    }

    ngOnInit(): void {
        console.log('start init comp');
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
        this.video = new Video(0, '', '', patact.unassigned, 0, new Language(), []);
        this.route.params
            .switchMap((params: Params) => +params['id'] ? this.videoservice.getVideo(+params['id']) : Observable.of<Video>(this.video))
            .subscribe(hero => { this.video = hero; this.changeLangStatus('gotvideo'); });
        this.langs = this.videoservice.getLangsCached();
        if (this.langs == null)
            this.videoservice.getLangs().subscribe(langs => { this.langs = langs; this.changeLangStatus('gotlangs'); });
        else 
            this.changeLangStatus('gotlangs');
        
    }	
    /**
     * Must get both video and all languages langs may or may not be observable (sometimes cached)        
     * @param newstate
     */
    private changeLangStatus(newstate: string): void {
        if (this.langStatus != null) {
            this.setDefVideoLanguage();
        }
        this.langStatus = newstate; 
    }
    private setDefVideoLanguage(): void {
        if (this.video.language && this.video.language.id) {
            let selVideoLang = this.langs.filter(c => c.id == this.video.language.id)[0];
            if (selVideoLang)
                this.video.language = selVideoLang;
        }
    }
    submitted = false;
    onSubmit() { this.submitted = true; }

 }