/* tslint:disable:no-unused-variable */

import { ReportService } from './report.service';
import  { fakeHttp } from '../testing/fake-http';


describe('ReportService', () => {
  let service: ReportService; 
    it('should return at least one video...', () => {
		service=new ReportService(new fakeHttp());
		expect(service.getVideos().subscribe(v=>v.length.toBeGreaterThan(0)));
	});    
  });
