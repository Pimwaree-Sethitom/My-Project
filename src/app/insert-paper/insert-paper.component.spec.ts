import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPaperComponent } from './insert-paper.component';

describe('InsertPaperComponent', () => {
  let component: InsertPaperComponent;
  let fixture: ComponentFixture<InsertPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertPaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
