/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { VideoStudyTryComponent } from './video-study-try.component';
import { FormsModule } from '@angular/forms';
import { VideoStudyListComponent } from './video-study-list.component';
import { ModalComponent } from '../../modal/modal.component';
import { ModalTriggerComponent } from '../../modal/modal-trigger.component';
import { reportServiceStub } from '../../testing/report.service.stub';
import { ActivatedRouteStub} from '../../testing/activated-route-stub';
import { ReportService } from '../report.service';
import { ActivatedRoute } from "@angular/router";
import { VideoStudy } from './video-study';

describe('VideoStudyTryComponent', () => {
  let component: VideoStudyTryComponent;
  let fixture: ComponentFixture<VideoStudyTryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStudyTryComponent, FakeloaderComponent,VideoStudyListComponent,ModalComponent,ModalTriggerComponent ],
	  providers: [ 
				{ provide: ReportService, useClass: reportServiceStub },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStub }		
			]	
	  imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStudyTryComponent);
    component = fixture.componentInstance;
	//let vs=new VideoStudy(0, '', '');
	//component.videoStudy=vs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
