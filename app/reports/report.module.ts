import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { VideoService } from './video.service';

@NgModule({
  imports: [CommonModule, ReportRoutingModule],
  declarations: [ReportComponent],
  providers: [VideoService]    
})
export class ReportModule { }