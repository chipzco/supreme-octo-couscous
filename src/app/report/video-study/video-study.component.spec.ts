/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { VideoStudyComponent } from './video-study.component';
import { FormsModule } from '@angular/forms';
import { VideoStudyListComponent } from './video-study-list.component';
import { ModalComponent } from '../../modal/modal.component';
import { ModalTriggerComponent } from '../../modal/modal-trigger.component';
import { reportServiceStub } from '../../testing/report.service.stub';
import { ActivatedRouteStub} from '../../testing/activated-route-stub';
import { ReportService } from '../report.service';
import { ActivatedRoute } from "@angular/router";
import { VideoStudy } from './video-study';

describe('VideoStudyComponent', () => {
  let component: VideoStudyComponent;
  let fixture: ComponentFixture<VideoStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStudyComponent, FakeloaderComponent,VideoStudyListComponent,ModalComponent,ModalTriggerComponent ],
	  providers: [ 
				{ provide: ReportService, useClass: reportServiceStub },
				{ provide: ActivatedRoute, useClass: ActivatedRouteStub }		
			]	
	  imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStudyComponent);
    component = fixture.componentInstance;	
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show dummy video after loaded',async() => {        	  	
     setTimeout(() => expect(component.video.id).toBe(666),10);
  }));  
  it('should show dummy video after loaded',async() => {        	  	
     setTimeout(() => expect(component.studies.length).toBe(2),10);
  }));  
  
});
