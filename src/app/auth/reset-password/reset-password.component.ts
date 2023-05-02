import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  otpConfig = {
    length: 6,
    allowNumbersOnly: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
}
