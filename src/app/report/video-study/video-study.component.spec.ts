/* tslint:disable:no-unused-variable */
import { async, tick, fakeAsync, ComponentFixture, TestBed, ComponentFixtureAutoDetect  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component,Input,Output,EventEmitter } from '@angular/core';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { VideoStudyComponent } from './video-study.component';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { VideoStudy } from './video-study';
import { reportServiceStub } from '../../testing/report.service.stub';
import { ActivatedRouteStub} from '../../testing/activated-route-stub';
import { ReportService } from '../report.service';
import { ActivatedRoute } from "@angular/router";

@Component ({
	selector: 'video-study-list',	
    template:  '',    
})
class VideoStudyStubList {
	@Input() videoid: number;    //pass video id from parent
    @Input() selvsid: number; //the selected video study (highlight it)
    @Input() eventGetList: Observable<number>; //observable that can contain video id as value
    @Output() eventEditLink: EventEmitter<VideoStudy> = new EventEmitter<VideoStudy>();
}


describe('VideoStudyComponent', () => {
  let component: VideoStudyComponent;
  let fixture: ComponentFixture<VideoStudyComponent>;
  let activatedRouteStub=new ActivatedRouteStub();
  let vs=new VideoStudy(999);
  //activatedRouteStub.setparam('id',100);  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStudyComponent, FakeloaderComponent,VideoStudyStubList],
	  providers: [ 				
				{ provide: ReportService, useClass: reportServiceStub },
				{ provide: ActivatedRoute, useValue: activatedRouteStub }		
			],	
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
  
  it('should show dummy video after loaded',<any>fakeAsync((): void  => {  
        activatedRouteStub.activateParams();
		tick(100);
		fixture.detectChanges();
		expect(component.video.id).toBe(666);	 
	})
  );  
  it('should show dummy studies after loaded',<any>fakeAsync((): void  => {     	  	
	 activatedRouteStub.activateParams();
	 tick(100);
	 fixture.detectChanges();
	 expect(component.studies.length).toBe(2);
  }));  
  it('should show dummy video study after passing id',<any>fakeAsync((): void  => {   
	 activatedRouteStub.setparam('id',100);  	
	 activatedRouteStub.activateParams();
	 tick(100);
	 fixture.detectChanges();
	 expect(component.videoStudy.id).toBe(100)
  }));  
  it('should show new video to edit when video study is passing  to edit function',async((): void  => {   	 		 
	 activatedRouteStub.activateParams();
	 fixture.whenStable().then(()=> {
		fixture.detectChanges();						
		component.editVS(vs);	 
		fixture.detectChanges();				
		expect(component.videoStudy.id).toBe(999);		
	 }); 	 
  }));    
});

    
