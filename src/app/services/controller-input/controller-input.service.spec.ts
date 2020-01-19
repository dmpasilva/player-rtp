import { TestBed } from '@angular/core/testing';

import { ControllerInputService } from './controller-input.service';

describe('ControllerInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControllerInputService = TestBed.get(ControllerInputService);
    expect(service).toBeTruthy();
  });
});
