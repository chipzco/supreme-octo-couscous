/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FakeloaderComponent } from './fakeloader.component';

describe('FakeloaderComponent', () => {
  let component: FakeloaderComponent;
  let fixture: ComponentFixture<FakeloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
