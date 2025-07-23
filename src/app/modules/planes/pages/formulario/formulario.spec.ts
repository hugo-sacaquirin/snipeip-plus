import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPlanComponent } from './formulario';

describe('FormularioPlanComponent', () => {
  let component: FormularioPlanComponent;
  let fixture: ComponentFixture<FormularioPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
