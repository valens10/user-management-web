import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modal/user-form/user-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  modalReference!: NgbModalRef;
  user:any

  constructor( private modalService: NgbModal,){}

  ngOnInit(): void {

  }
  openEditUserModal() {
    this.modalReference = this.modalService.open(UserFormComponent, {
      centered: false,
      size: 'lg',
    });
    this.modalReference.componentInstance.ref = this.modalReference;
    this.modalReference.componentInstance.User = this.user;
    this.modalReference.result.then(
      (data) => {
        const result = data;
        console.log(result)
      },
      (reason) => {
        // on dismiss
      }
    );
  }


}
