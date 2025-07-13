import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlineacionesComponent } from './lista';

describe('ListaAlineacionesComponent', () => {
  let component: ListaAlineacionesComponent;
  let fixture: ComponentFixture<ListaAlineacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlineacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlineacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
