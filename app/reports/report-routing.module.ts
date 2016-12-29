import { NgModule }           from '@angular/core';
import { RouterModule }  from '@angular/router';
import { ReportComponent } from './report.component';
import { VideoReportComponent } from './videoreport.component';


@NgModule({
  imports: [RouterModule.forChild([    
      { path: 'report', component: ReportComponent },	
      { path: 'videoreport', component: VideoReportComponent }      
  ])],
  exports: [RouterModule]
})
export class ReportRoutingModule {}