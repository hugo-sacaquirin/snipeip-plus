import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProyectosComponent } from './lista';

describe('ListaProyectosComponent', () => {
  let component: ListaProyectosComponent;
  let fixture: ComponentFixture<ListaProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
