import { TestBed, inject } from '@angular/core/testing';

import { ClassesDmService } from './classes-dm.service';

describe('ClassesDmServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassesDmService]
    });
  });

  it('should be created', inject([ClassesDmService], (service: ClassesDmService) => {
    expect(service).toBeTruthy();
  }));
});
