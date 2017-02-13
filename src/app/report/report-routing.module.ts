import { NgModule }           from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoFormComponent } from './videos/video-form.component';
import   { VideosComponent }   from './videos/videos.component';
import { StudyFormComponent } from './studies/study-form.component';
import { StudiesComponent } from './studies/studies.component';
import { VideoStudyComponent } from './video-study/video-study.component';
import { ReportsComponent } from './reports.component';
import { AdminLinksComponent } from './admin-links/admin-links.component';
@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'reports', component: ReportsComponent,
            children:
            [
                { path: '', component: AdminLinksComponent, outlet: 'admin'},
                { path: 'videoform', component: VideoFormComponent, outlet: 'admin' },
                { path: 'videoform/:id', component: VideoFormComponent, outlet: 'admin'  },
                { path: 'studyform', component: StudyFormComponent, outlet: 'admin' },
                { path: 'studyform/:id', component: StudyFormComponent, outlet: 'admin' },
                { path: 'studies', component: StudiesComponent, outlet: 'admin' },
                { path: 'videos', component: VideosComponent, outlet: 'admin' },
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