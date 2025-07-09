import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaObjetivosComponent } from './lista';



describe('ListaObjetivosComponent', () => {
  let component: ListaObjetivosComponent;
  let fixture: ComponentFixture<ListaObjetivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaObjetivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
