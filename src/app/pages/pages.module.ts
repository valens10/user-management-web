import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { NgbAccordionModule, NgbDropdownModule, NgbModalModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './modal/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePicModalComponent } from './modal/profile-pic-modal/profile-pic-modal.component';
import { UpdateVerificationComponent } from './modal/update-verification/update-verification.component';


@NgModule({
  declarations: [
    SideNavComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    HomeComponent,
    UserFormComponent,
    ProfilePicModalComponent,
    UpdateVerificationComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbAccordionModule,
    NgOtpInputModule,
    HttpClientModule
    
  ]
})
export class PagesModule { }
