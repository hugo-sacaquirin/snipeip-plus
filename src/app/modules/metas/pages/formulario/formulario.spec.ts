import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMetaComponent } from './formulario';

describe('FormularioMetaComponent', () => {
  let component: FormularioMetaComponent;
  let fixture: ComponentFixture<FormularioMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
