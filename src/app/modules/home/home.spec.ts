import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTs } from './home';



describe('HomeTs', () => {
  let component: HomeTs;
  let fixture: ComponentFixture<HomeTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
