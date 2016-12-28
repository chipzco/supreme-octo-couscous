import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { VideoService } from './video.service';
import { VideoReportComponent } from './videoreport.component';

@NgModule({
  imports: [CommonModule, ReportRoutingModule],
  declarations: [ReportComponent, VideoReportComponent],
  providers: [VideoService]    
})
export class ReportModule { }