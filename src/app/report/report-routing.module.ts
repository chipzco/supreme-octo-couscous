import { NgModule }           from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoFormComponent } from './videos/video-form.component';
import   { VideosComponent }   from './videos/videos.component';


@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'videos', component: VideosComponent },
      { path: 'videoform/:id', component: VideoFormComponent },
      { path: 'videoform', component: VideoFormComponent }
	
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule {}