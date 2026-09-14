import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RackComponent } from './rack-component';

describe('RackComponent', () => {
  let component: RackComponent;
  let fixture: ComponentFixture<RackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RackComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
