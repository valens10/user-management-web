import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modal/user-form/user-form.component';
import { IdentificationModalComponent } from '../modal/identification-modal/identification-modal.component';
import { ProfilePicModalComponent } from '../modal/profile-pic-modal/profile-pic-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  modalReference!: NgbModalRef;
  user:any
  otpConfig = {
    length: 6,
    allowNumbersOnly: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

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

  openIdentificationModal() {
    this.modalReference = this.modalService.open(IdentificationModalComponent, {
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

  openProfilePicture() {
    this.modalReference = this.modalService.open(ProfilePicModalComponent, {
      centered: false,
      size: 'lg',
    });
    this.modalReference.componentInstance.ref = this.modalReference;
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


  onFIdSelectionChange(event:Event){

  }

}
