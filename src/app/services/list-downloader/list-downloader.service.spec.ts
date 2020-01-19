import { TestBed } from '@angular/core/testing';

import { ListDownloaderService } from './list-downloader.service';

describe('ListDownloaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListDownloaderService = TestBed.get(ListDownloaderService);
    expect(service).toBeTruthy();
  });
});
