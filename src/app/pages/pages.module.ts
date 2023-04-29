import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './modal/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SideNavComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    HomeComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule 
  ]
})
export class PagesModule { }
