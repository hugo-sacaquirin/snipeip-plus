import { TestBed } from '@angular/core/testing';

import { Entidades } from './entidades';

describe('Entidades', () => {
  let service: Entidades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entidades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
