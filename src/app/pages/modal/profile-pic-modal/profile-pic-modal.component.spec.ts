import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicModalComponent } from './profile-pic-modal.component';

describe('ProfilePicModalComponent', () => {
  let component: ProfilePicModalComponent;
  let fixture: ComponentFixture<ProfilePicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
