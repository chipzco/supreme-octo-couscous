/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportService } from './report.service';
import  { fakeHttp } from '../testing/fake-http';


describe('ReportService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService,{provide: Http, useClass: fakeHttp }]
    });
  });

  it('should ...', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
});
