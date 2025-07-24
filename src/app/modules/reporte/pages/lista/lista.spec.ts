import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPlanesComponent } from './lista';

describe('ReportesPlanesComponent', () => {
  let component: ReportesPlanesComponent;
  let fixture: ComponentFixture<ReportesPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
