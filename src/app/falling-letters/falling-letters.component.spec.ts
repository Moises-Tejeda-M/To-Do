import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallingLettersComponent } from './falling-letters.component';

describe('FallingLettersComponent', () => {
  let component: FallingLettersComponent;
  let fixture: ComponentFixture<FallingLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallingLettersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallingLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
