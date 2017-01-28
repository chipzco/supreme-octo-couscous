/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WatcherService } from './watcher.service';

describe('WatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WatcherService]
    });
  });

  it('should ...', inject([WatcherService], (service: WatcherService) => {
    expect(service).toBeTruthy();
  }));
});
