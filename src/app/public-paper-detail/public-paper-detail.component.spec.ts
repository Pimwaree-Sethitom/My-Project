import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPaperDetailComponent } from './public-paper-detail.component';

describe('PublicPaperDetailComponent', () => {
  let component: PublicPaperDetailComponent;
  let fixture: ComponentFixture<PublicPaperDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPaperDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPaperDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
