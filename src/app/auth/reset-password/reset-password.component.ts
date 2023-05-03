import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  profile: any = {};
  errorMsg = '';
  sucessMsg = ''
  email:any = ''
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
      password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/),],
      ],
    });
  }

  onSubmit() {
    this.errorMsg = ''
    this.passwordErrorMessage = ''
    if (this.formGroup.valid) {
      const param = this.formGroup.value;
      param['username'] = this.email
      this.apiService.change_password(param).subscribe(
        (res:any) => {
          this.sucessMsg = 'Your password has been changed successful.'
          console.log('res', res);
          this.successAlert(this.sucessMsg)
        },
        (err) => {
          this.errorMsg = err?.error['detail'];
          console.log('error--', this.errorMsg);

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
        this.passwordErrorMessage ='Password must be at least 8 characters long.';
      } else if (passwordErrors.pattern) {
        this.passwordErrorMessage =
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    } else if (code) {
      this.passwordErrorMessage = 'Code is required';
    }
  }

  sendOtp(){
    if(this.email){
      const param = {
        username:this.email
      }
      this.apiService.request_otp(param).subscribe(
        (res:any) => {
          this.sucessMsg = res['detail']
          this.is_code_sent = true
        },
        (err) => {
          this.is_code_sent = false
          this.errorMsg = err?.error['detail'];
          console.log('error--', this.errorMsg);
        }
      );
    }else{
      this.errorMsg = 'Email is required'
    }
  }

 // Success alert
 successAlert(message:any) {
  let timerInterval:any
    Swal.fire({icon: 'success', title: 'Account Reset', html: `${message}`, timer: 2000, timerProgressBar: true,
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