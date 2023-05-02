import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  otpConfig = {
    length: 6,
    allowNumbersOnly: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  }

  onSubmit() {
    // Handle form submission here
  }
}
