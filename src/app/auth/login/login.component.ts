import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMsg = ''
  isLoading = false
  sucessMsg = ''
  passwordErrorMessage = ''
  userForm!: FormGroup;
  constructor(private apiService: AuthService, private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  //Initiate user credential form
  createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.errorMsg = ''
      const param = this.userForm.value
      sessionStorage.setItem('username', param['username'])
      this.isLoading = true
      this.apiService.request_otp(param).subscribe((res:any)=>{
        this.sucessMsg = res['detail']
        this.isLoading = true
        console.log('res',res)
        window.location.href = '/auth/otp-verification'
      },err=>{
        this.errorMsg =err?.error['detail']
        console.log('error--', this.errorMsg)
        this.isLoading = true
      })
    } else {
      this.errorMsg = 'Email is required'
    }
  }

  getMagicLink(){
    this.errorMsg = ''
    if (this.userForm.valid) {
      const param = this.userForm.value;
      this.isLoading = true
      this.apiService.generate_magic_link(param).subscribe(
        (res: any) => {
          console.log(res)
          this.magicAlert()
        },
        (err: any) => {
          this.errorMsg =err?.error['detail']
          console.log('error--', this.errorMsg)
          this.isLoading = false
        }
      );
    }else{
      this.errorMsg = 'Email is required'
    }
  }

  magicAlert(){
    Swal.fire(
      'Login With Magic link',
      'The login link has been sent successful to your email.',
      'info'
    ).then(()=>{
      this.isLoading = false
    })
  }

} 
