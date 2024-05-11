import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelButtonComponent } from './level-button.component';

describe('LevelButtonComponent', () => {
  let component: LevelButtonComponent;
  let fixture: ComponentFixture<LevelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LevelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
