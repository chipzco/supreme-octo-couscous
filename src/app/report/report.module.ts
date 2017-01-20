import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { VideosComponent } from './videos/videos.component';
import { ReportService } from './report.service';

@NgModule({
  imports: [
      CommonModule, ReportRoutingModule
  ],
  declarations: [VideosComponent],
  providers: [ReportService]
})
export class ReportModule { }
