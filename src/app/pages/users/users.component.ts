import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../service/pages.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UpdateVerificationComponent } from '../modal/update-verification/update-verification.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userFilter: any = ''
  modalReference!: NgbModalRef;
  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);

  users: any = []

  constructor(
    private apiService: PagesService,
    private router: Router,
    private _location: Location,
    private modalService: NgbModal,
  ) {
    if (!this.profile.is_staff) { this._location.back() }
  }

  ngOnInit(): void {
    this.getUsers()

  }

  getUsers() {
    this.apiService.get_users().subscribe(
      (response: any) => {
        this.users = response

      },
      (error: any) => {

      }
    );
  }

  deleteUser(user_id: any) {
    const param = this.profile.id
    this.apiService.deleteUser(param).subscribe(
      (response: any) => {

        window.location.reload()
      },
      (error: any) => {

      }
    );
  }

  verifyUser(user: any) {
    this.modalReference = this.modalService.open(UpdateVerificationComponent, {
      centered: false,
      size: 'lg',
    });
    this.modalReference.componentInstance.ref = this.modalReference;
    this.modalReference.componentInstance.User = user;
    this.modalReference.result.then(
      (data) => {
        this.getUsers()

      },
      (reason) => {
        // on dismiss
      }
    );
  }

  searchuser(event: Event) { }
}


