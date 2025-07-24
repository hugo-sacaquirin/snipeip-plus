import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObservacionGestionPlanesComponent } from './observaciones';

describe('ModalObservacionGestionPlanesComponent', () => {
  let component: ModalObservacionGestionPlanesComponent;
  let fixture: ComponentFixture<ModalObservacionGestionPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalObservacionGestionPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalObservacionGestionPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
