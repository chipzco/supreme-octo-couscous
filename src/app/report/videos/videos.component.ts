import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Video } from './video';
import { Language } from './video';
import { patact } from './video';
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    constructor(private reportservice: ReportService) { }
    videos_obj: Observable<Array<Video>>;
    patlabels: Array<string>;

    ngOnInit() {
        this.videos_obj = this.reportservice.getVideos();
        this.patlabels = [patact[patact.unassigned], patact[patact.patient], patact[patact.actor], patact[patact.unknown]];
       
     }

}
