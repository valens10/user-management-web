import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RegisterComponent } from './register/register.component';
import { LoginWithMagicLinkComponent } from './login-with-magic-link/login-with-magic-link.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component:LoginComponent },
  { path: 'reset-password', component:ResetPasswordComponent },
  { path: 'otp-verification', component:OtpVerificationComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'login-with-link/:login_id', component: LoginWithMagicLinkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
