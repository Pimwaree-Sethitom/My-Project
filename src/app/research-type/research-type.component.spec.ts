import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchTypeComponent } from './research-type.component';

describe('ResearchTypeComponent', () => {
  let component: ResearchTypeComponent;
  let fixture: ComponentFixture<ResearchTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
