import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCellComponent } from './mini-cell.component';

describe('MiniCellComponent', () => {
  let component: MiniCellComponent;
  let fixture: ComponentFixture<MiniCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
