import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { VideosComponent } from './videos/videos.component';
import { VideoFormComponent } from './videos/video-form.component';
import { RepeaterDirective } from './repeater.directive';
import { ReportService } from './report.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalTriggerComponent } from '../modal/modal-trigger.component';
import { FakeloaderComponent } from './fakeloader/fakeloader.component';

@NgModule({
  imports: [
      CommonModule, ReportRoutingModule, FormsModule
  ],
  declarations: [VideosComponent, VideoFormComponent, RepeaterDirective, ModalComponent, ModalTriggerComponent,FakeloaderComponent],
  providers: [ReportService]
})
export class ReportModule { }
