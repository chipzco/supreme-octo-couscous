import { NgModule }           from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoFormComponent } from './videos/video-form.component';
import   { VideosComponent }   from './videos/videos.component';
import { StudyFormComponent } from './studies/study-form.component';
import { StudiesComponent } from './studies/studies.component';
import { VideoStudyComponent } from './video-study/video-study.component';
import { ReportsComponent } from './reports.component';
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'reports', component: ReportsComponent,
            children:
            [
                { path: 'videoform', component: VideoFormComponent, outlet: 'report_content' },
                { path: 'studyform', component: StudyFormComponent, outlet: 'report_content' },
                
            ]
        },
      { path: 'videos', component: VideosComponent },
      { path: 'videoform/:id', component: VideoFormComponent },
      { path: 'videoform', component: VideoFormComponent },
      { path: 'studyform', component: StudyFormComponent },
      { path: 'studyform/:id', component: StudyFormComponent },
      { path: 'studies', component: StudiesComponent },
      { path: 'videostudies/:videoid', component: VideoStudyComponent }	
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule {}