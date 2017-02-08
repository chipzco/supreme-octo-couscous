import { NgModule }           from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoFormComponent } from './videos/video-form.component';
import   { VideosComponent }   from './videos/videos.component';
import { StudyFormComponent } from './studies/study-form.component';
import { StudiesComponent } from './studies/studies.component';

@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'videos', component: VideosComponent },
      { path: 'videoform/:id', component: VideoFormComponent },
      { path: 'videoform', component: VideoFormComponent },
      { path: 'studyform', component: StudyFormComponent },
      { path: 'studyform/:id', component: StudyFormComponent },
      { path: 'studies', component: StudiesComponent }
	
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule {}