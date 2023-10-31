import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
})
export class OtpVerificationComponent implements OnInit {
  profile: any = {};
  errorMsg = '';
  isLoading = false
  sucessMsg = ''
  username: any = ''
  passwordErrorMessage = '';
  formGroup!: FormGroup;
  otpConfig = {
    length: 6,
    allowNumbersOnly: false,
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  constructor(private apiService: AuthService, private fb: FormBuilder) {
    this.username = sessionStorage.getItem('username')
  }

  ngOnInit() {
    this.createForm()
  }

  get otpControl(): FormControl {
    return this.formGroup.get('code') as FormControl;
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: [{ value: this.username, disabled: true }, Validators.required],
      code: ['', Validators.required],
      password: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    this.errorMsg = ''
    if (this.formGroup.valid) {
      const param = this.formGroup.value;
      param['username'] = this.username

      this.isLoading = true
      this.apiService.login(param).subscribe(
        (res: any) => {
          this.sucessMsg = 'You have been successful logged in.'

          window.sessionStorage.setItem('profile', JSON.stringify(res))
          this.successAlert(this.sucessMsg)
          this.isLoading = false
        },
        (err) => {
          this.errorMsg = err?.error['detail'];

          this.isLoading = false
        }
      );
    } else {
      this.errorMsg = 'All input are required.'
    }
  }

  // Success alert
  successAlert(message: any) {
    let timerInterval: any
    Swal.fire({
      icon: 'success', title: 'Logged In', html: `${message}`, timer: 2000, timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '../pages/ums/home'

      }
    })
  }

}
