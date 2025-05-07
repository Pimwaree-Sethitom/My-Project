import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartileComponent } from './quartile.component';

describe('QuartileComponent', () => {
  let component: QuartileComponent;
  let fixture: ComponentFixture<QuartileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuartileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuartileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
