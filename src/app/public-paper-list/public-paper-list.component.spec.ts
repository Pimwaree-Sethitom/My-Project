import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPaperListComponent } from './public-paper-list.component';

describe('PublicPaperListComponent', () => {
  let component: PublicPaperListComponent;
  let fixture: ComponentFixture<PublicPaperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPaperListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicPaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
