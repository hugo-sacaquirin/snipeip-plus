import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProgramaComponent } from './formulario';

describe('FormularioProgramaComponent', () => {
  let component: FormularioProgramaComponent;
  let fixture: ComponentFixture<FormularioProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
