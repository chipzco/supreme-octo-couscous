/* tslint:disable:no-unused-variable */
import { Component }                 from '@angular/core';
import { TestBed, ComponentFixture, async  } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { AppComponent } from './app.component';
import {RouterLinkStubDirective} from './testing/router-link-stub.directive';
import {RouterOutlet } from './testing/router-stub.directive';
import  { ActivatedRouteStub } from './testing/activated-route-stub';
import {RouterStub  } from './testing/router-stub';
import { WatcherService } from './watcher.service'; 


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;	
  let comp: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;  
  let activatedRouteStub=new ActivatedRouteStub();
  let routerStub=new RouterStub();
  let watcherServiceStub=new WatcherService();  
  // async beforeEach
   beforeEach(async(() => {  
	  TestBed.configureTestingModule({
		declarations: [
			AppComponent,
			RouterLinkStubDirective,
			RouterOutlet
			],
		providers: [ 
				{provide: ActivatedRoute, useValue: ActivatedRouteStub() },
				{provide: Router, useValue: new RouterStub() },
				WatcherService
			]	
	  }).compileComponents();	
  }));
  /*
  beforeEach(() => {    
	fixture = TestBed.createComponent(AppComponent);
	comp=fixture.componentInstance;
	de=fixture.debugElement.query(By.css('h1'));
	el=de.nativeElement;
    
  });
 */

  it('should create the app',async(() => {    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
  it(`should have as title 'app works!'`, async(() => {   
    expect(comp.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {       
    expect(de.textContent).toContain('app works!');
  }));
  */
});
