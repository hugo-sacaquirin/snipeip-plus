import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGestionPlanComponent } from './formulario';

describe('FormularioGestionPlanComponent', () => {
  let component: FormularioGestionPlanComponent;
  let fixture: ComponentFixture<FormularioGestionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioGestionPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioGestionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
