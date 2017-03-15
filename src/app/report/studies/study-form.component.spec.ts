/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteStub} from '../../testing/activated-route-stub';
import { FakeloaderComponent } from '../fakeloader/fakeloader.component';
import { ModalComponent } from '../../modal/modal.component';
import { ModalTriggerComponent } from '../../modal/modal-trigger.component';
import { reportServiceStub } from '../../testing/report.service.stub';
import { ReportService } from '../report.service';
import { ActivatedRoute } from "@angular/router";
import { StudyFormComponent } from './study-form.component';
import {RouterLinkStubDirective} from '../../testing/router-link-stub.directive';

describe('StudyFormComponent', () => {
  let component: StudyFormComponent;
  let fixture: ComponentFixture<StudyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyFormComponent,FakeloaderComponent, ModalComponent,ModalTriggerComponent,RouterLinkStubDirective],
	  providers: [ 				
					{ provide: ReportService, useClass: reportServiceStub },
					{ provide: ActivatedRoute, useClass: ActivatedRouteStub }	
				],
	  imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
