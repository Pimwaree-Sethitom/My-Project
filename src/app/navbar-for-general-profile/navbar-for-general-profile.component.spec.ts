import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForGeneralProfileComponent } from './navbar-for-general-profile.component';

describe('NavbarForGeneralProfileComponent', () => {
  let component: NavbarForGeneralProfileComponent;
  let fixture: ComponentFixture<NavbarForGeneralProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarForGeneralProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarForGeneralProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
