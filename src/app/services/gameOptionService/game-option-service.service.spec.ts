import { TestBed } from '@angular/core/testing';

import { GameOptionServiceService } from './game-option-service.service';

describe('GameOptionServiceService', () => {
  let service: GameOptionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameOptionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
