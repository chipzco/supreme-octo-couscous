/* tslint:disable:no-unused-variable */
import { async,fakeAsync,tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,OnInit, Input } from '@angular/core';
import { LoaderTexts, LoaderStatus } from './loader-texts';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FakeloaderComponent } from './fakeloader.component';

describe('FakeloaderComponent', () => {
  let component: FakeloaderComponent;
  let fixture: ComponentFixture<FakeloaderComponent>;
  let starStop_s: Subject<LoaderStatus> = new Subject<LoaderStatus>();
  let startStop=starStop_s.asObservable();
   let loadTexts = new LoaderTexts("process Running", "process Finished");	
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeloaderComponent);
    component = fixture.componentInstance;	
	component.startStop=startStop;
	component.loadTexts=loadTexts;	
	component.ngOnInit();		
	fixture.detectChanges();
	starStop_s.next(LoaderStatus.Start);    	
	
  });
  afterEach(()=>{
	starStop_s.next(LoaderStatus.Stop);	
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('should have nothing happening info text', () => {
    expect(component.infotext).toBe("nothing happening right now");
  });
  */
  it('should show fakeloader when started',() => {  
	  //starStop_s.next(LoaderStatus.Start);  
	  
      expect(component.hideLoader).toBe(false);
  });  
  it('should show start process Running info text  when started',() => {        	  
      expect(component.infotext).toBe("process Running");
  });  
  it('should show progress after started',async((): void  => {          	  	     	
    setTimeout(() => { console.log(component.progress); expect(component.progress).toBeGreaterThan(25) },5);
  }));  
   it('should show End info text  when stopped',() => {        
	  starStop_s.next(LoaderStatus.Stop);
      expect(component.infotext).toBe("process Finished");
  });  
  it('should show show 100% when stopped',() => {        
	  starStop_s.next(LoaderStatus.Stop);
      expect(component.progress).toBe(100);
  });  
   it('should show show Error text when error is sent',() => {  
	  fixture.detectChanges();	
	  expect(component.infotext).toBe("process Running");
	  starStop_s.next(LoaderStatus.Error);
	  expect(component.infotext).toBe(loadTexts.errorText);
  });  
  it('should hide loader after some some time',() => {        
	  starStop_s.next(LoaderStatus.Stop);	  
	  fixture.detectChanges();	  
	  expect(component.hideLoader).toBe(false); //does not hide right away
	  setTimeout(() => expect(component.hideLoader).toBe(true),1000);	  
  });  
  
  
});
