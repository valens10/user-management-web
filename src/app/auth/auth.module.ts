import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
