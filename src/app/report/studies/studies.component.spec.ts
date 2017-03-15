/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ModalTriggerComponent } from '../../modal/modal-trigger.component';
import { reportServiceStub } from '../../testing/report.service.stub';
import { ActivatedRouteStub} from '../../testing/activated-route-stub';
import { ReportService } from '../report.service';
import { Router,ActivatedRoute } from "@angular/router";
import { StudiesComponent } from './studies.component';
import {RouterLinkStubDirective} from '../../testing/router-link-stub.directive';
import {RouterStub  } from '../../testing/router-stub';
import { WatcherService } from '../../watcher.service';
describe('StudiesComponent', () => {
  let component: StudiesComponent;
  let fixture: ComponentFixture<StudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudiesComponent,FakeloaderComponent,ModalComponent,ModalTriggerComponent,RouterLinkStubDirective],
	  providers: [{ provide: ReportService, useClass: reportServiceStub },					
					{ provide: Router, useClass: RouterStub },	
					WatcherService			
				 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
