import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVerificationComponent } from './update-verification.component';

describe('UpdateVerificationComponent', () => {
  let component: UpdateVerificationComponent;
  let fixture: ComponentFixture<UpdateVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
