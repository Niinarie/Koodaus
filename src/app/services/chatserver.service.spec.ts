/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatserverService } from './chatserver.service';

describe('ChatserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatserverService]
    });
  });

  it('should ...', inject([ChatserverService], (service: ChatserverService) => {
    expect(service).toBeTruthy();
  }));
});
