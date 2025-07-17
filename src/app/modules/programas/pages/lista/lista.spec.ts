import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProgramasComponent } from './lista';

describe('ListaProgramasComponent', () => {
  let component: ListaProgramasComponent;
  let fixture: ComponentFixture<ListaProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProgramasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
