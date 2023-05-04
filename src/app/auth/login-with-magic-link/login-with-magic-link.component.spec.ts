import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithMagicLinkComponent } from './login-with-magic-link.component';

describe('LoginWithMagicLinkComponent', () => {
  let component: LoginWithMagicLinkComponent;
  let fixture: ComponentFixture<LoginWithMagicLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithMagicLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithMagicLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
