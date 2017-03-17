import { NgModule }           from '@angular/core';
import { RouterModule,CanActivate } from '@angular/router';
import { VideoFormComponent } from './videos/video-form.component';
import   { VideosComponent }   from './videos/videos.component';
import { StudyFormComponent } from './studies/study-form.component';
import { StudiesComponent } from './studies/studies.component';
import { VideoStudyComponent } from './video-study/video-study.component';
import { ReportsComponent } from './reports.component';
import { AdminLinksComponent } from './admin-links/admin-links.component';
import { AuthGuard } from '../auth-guard.service';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'reports', component: ReportsComponent,
            children:
            [
                { path: '', component: AdminLinksComponent, outlet: 'admin'},
                { path: 'videoform', component: VideoFormComponent, outlet: 'admin',canActivate: [AuthGuard]  },
                { path: 'videoform/:id', component: VideoFormComponent, outlet: 'admin',canActivate: [AuthGuard]   },
                { path: 'studyform', component: StudyFormComponent, outlet: 'admin',canActivate: [AuthGuard]  },
                { path: 'studyform/:id', component: StudyFormComponent, outlet: 'admin',canActivate: [AuthGuard]  },
                { path: 'studies', component: StudiesComponent, outlet: 'admin',canActivate: [AuthGuard]  },
                { path: 'videos', component: VideosComponent, outlet: 'admin',canActivate: [AuthGuard]  },
                { path: 'videostudies/:videoid', component: VideoStudyComponent, outlet: 'admin',canActivate: [AuthGuard]  }	
            ]			
        },
      { path: 'videos', component: VideosComponent },
      { path: 'videoform/:id', component: VideoFormComponent,canActivate: [AuthGuard]  },
      { path: 'videoform', component: VideoFormComponent,canActivate: [AuthGuard]  },
      { path: 'studyform', component: StudyFormComponent,canActivate: [AuthGuard]  },
      { path: 'studyform/:id', component: StudyFormComponent,canActivate: [AuthGuard]  },
      { path: 'studies', component: StudiesComponent } 
    
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule {}