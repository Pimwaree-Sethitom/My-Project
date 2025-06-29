import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForExecutiveProfileComponent } from './navbar-for-executive-profile.component';

describe('NavbarForExecutiveProfileComponent', () => {
  let component: NavbarForExecutiveProfileComponent;
  let fixture: ComponentFixture<NavbarForExecutiveProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarForExecutiveProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarForExecutiveProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
