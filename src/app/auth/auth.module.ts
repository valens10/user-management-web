import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginWithMagicLinkComponent } from './login-with-magic-link/login-with-magic-link.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    OtpVerificationComponent,
    RegisterComponent,
    LoginWithMagicLinkComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
      
  ]
})
export class AuthModule { }
