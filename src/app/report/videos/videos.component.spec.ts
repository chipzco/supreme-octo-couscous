/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { ReportService } from '../report.service';
import { Router } from "@angular/router";
import { VideosComponent } from './videos.component';
import {RouterStub  } from '../../testing/router-stub';
import { reportServiceStub } from '../../testing/report.service.stub';
import { WatcherService } from '../../watcher.service';
import { ModalComponent } from '../../modal/modal.component';
import { ModalTriggerComponent } from '../../modal/modal-trigger.component';
import {RouterLinkStubDirective} from '../../testing/router-link-stub.directive';


describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosComponent,FakeloaderComponent,ModalComponent,ModalTriggerComponent,RouterLinkStubDirective  ]
	   providers: [{ provide: ReportService, useClass: reportServiceStub },					
					{ provide: Router, useClass: RouterStub },	
					WatcherService			
				 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
