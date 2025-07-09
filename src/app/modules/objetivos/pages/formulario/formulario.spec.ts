import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioObjetivoComponent } from './formulario';



describe('FormularioObjetivoComponent', () => {
  let component: FormularioObjetivoComponent;
  let fixture: ComponentFixture<FormularioObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioObjetivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
