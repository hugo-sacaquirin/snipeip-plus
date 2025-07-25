import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGestionPlanesComponent } from './lista';

describe('ListaGestionPlanesComponent', () => {
  let component: ListaGestionPlanesComponent;
  let fixture: ComponentFixture<ListaGestionPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGestionPlanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGestionPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
