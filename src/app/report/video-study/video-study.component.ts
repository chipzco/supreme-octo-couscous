import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from './../videos/video';
import { VideoStudy } from './video-study';
import { ReportService } from '../report.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import { LoaderTexts, LoaderStatus } from '../fakeloader/loader-texts';

@Component({
  selector: 'app-video-study',
  templateUrl: './video-study.component.html',
  styleUrls: ['./video-study.component.scss']
})
export class VideoStudyComponent implements OnInit {
    videoStudy: VideoStudy;

  constructor(private videoservice: ReportService, private route: ActivatedRoute) { }

  ngOnInit() { 
      this.videoStudy = new VideoStudy(0, '', '');
  }

}
