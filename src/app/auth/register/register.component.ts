import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  profile: any = {};
  errorMsg = '';
  sucessMsg = ''
  isLoading = false
  email: any = ''
  is_code_sent = false
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

  constructor(private apiService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.createForm()
  }

  get otpControl(): FormControl {
    return this.formGroup.get('code') as FormControl;
  }

  createForm() {
    this.formGroup = this.fb.group({
      code: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/),],
      ],
    });
  }

  onSubmit() {
    this.errorMsg = ''
    this.passwordErrorMessage = ''
    if (this.formGroup.valid) {
      const param = this.formGroup.value;
      param['username'] = this.email

      this.isLoading = true
      this.apiService.change_password(param).subscribe(
        (res: any) => {
          this.sucessMsg = 'Your account has been created successful. '

          this.successAlert(this.sucessMsg)
          this.isLoading = false
        },
        (err) => {
          this.errorMsg = err?.error['detail'];

          this.isLoading = false
        }
      );
    } else {
      this.formValidation()
    }
  }

  formValidation() {
    const passwordErrors: any = this.formGroup.get('password')?.errors; //get password errors
    const code = this.formGroup.get('code')?.errors; // get username errors
    if (passwordErrors) {
      if (passwordErrors.required) {
        this.passwordErrorMessage = 'Password is required.';
      } else if (passwordErrors.minlength) {
        this.passwordErrorMessage = 'Password must be at least 8 characters long.';
      } else if (passwordErrors.pattern) {
        this.passwordErrorMessage =
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    } else if (code) {
      this.passwordErrorMessage = 'Code is required';
    }
  }

  sendOtp() {
    if (this.email) {
      const param = {
        username: this.email,
        is_register: true
      }
      this.isLoading = true
      this.apiService.request_otp(param).subscribe(
        (res: any) => {
          this.sucessMsg = res['detail']
          this.is_code_sent = true
          this.isLoading = false
        },
        (err) => {
          this.is_code_sent = false
          this.errorMsg = err?.error['detail'];

          this.isLoading = false
        }
      );
    } else {
      this.errorMsg = 'Email is required'
    }
  }


  // Success alert
  successAlert(message: any) {
    let timerInterval: any
    Swal.fire({
      icon: 'success', title: 'Registered', html: `${message}`, timer: 2000, timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/auth/login']);
      }
    })
  }

}
