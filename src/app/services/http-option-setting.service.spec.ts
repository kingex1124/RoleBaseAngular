import { TestBed } from '@angular/core/testing';

import { HttpOptionSettingService } from './http-option-setting.service';

describe('HttpOptionSettingService', () => {
  let service: HttpOptionSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOptionSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
