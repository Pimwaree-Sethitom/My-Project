import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchBarComponent } from './research-bar.component';

describe('ResearchBarComponent', () => {
  let component: ResearchBarComponent;
  let fixture: ComponentFixture<ResearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
