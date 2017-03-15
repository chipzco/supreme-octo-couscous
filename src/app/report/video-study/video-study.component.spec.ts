/* tslint:disable:no-unused-variable */
import { async, tick, fakeAsync, ComponentFixture, TestBed, ComponentFixtureAutoDetect  } from '@angular/core/testing';
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
  let activatedRouteStub=new ActivatedRouteStub();
  //activatedRouteStub.setparam('id',100);  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStudyComponent, FakeloaderComponent,VideoStudyListComponent,ModalComponent,ModalTriggerComponent ],
	  providers: [ 				
				{ provide: ReportService, useClass: reportServiceStub },
				{ provide: ActivatedRoute, useValue: activatedRouteStub }		
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
  
  it('should show dummy video after loaded',() => {        	  	
     setTimeout(()=> {fixture.detectChanges(); expect(component.video.id).toBe(5666),200)};	 
  });  
  it('should show dummy video after loaded',() => {        	  	
	 setTimeout(()=>expect(component.studies.length).toBe(2),100);
  });  
  /*
  it('should show dummy video study after passing',async() => {   	
     setTimeout(
		() =>  {			
			activatedRouteStub.setparam('id',100);  
			activatedRouteStub.activateParams(); 
			setTimeout(()=>expect(component.videoStudy.id).toBe(101);)			
		},10);
  }));  
  */
});

    describe('this test', () => {
      it('looks async but is synchronous', <any>fakeAsync((): void => {
           let flag = false;
           setTimeout(() => { flag = true; }, 100);
           expect(flag).toBe(false);
           tick(50);
           expect(flag).toBe(false);
           tick(50);
           expect(flag).toBe(true);
         }));
    });
