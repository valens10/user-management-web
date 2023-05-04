import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modal/user-form/user-form.component';
import { Router } from '@angular/router';
import { PagesService } from '../service/pages.service';
import { ProfilePicModalComponent } from '../modal/profile-pic-modal/profile-pic-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);
  formData: FormData = new FormData();
  nid_doc:any
  modalReference!: NgbModalRef;
  otpConfig = {
    length: 6,
    allowNumbersOnly: false,
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  constructor( 
    private modalService: NgbModal,
    private apiService: PagesService, 
    private router:Router
    ){}

  ngOnInit(): void {
    console.log(this.profile)
    this.getProfile();

  }


  getProfile() {
     const param = this.profile.id
    this.apiService.get_user_details(param).subscribe(
      (response: any) => {
        const profile = {
          ...response,
          token: this.profile.token
        };

        window.sessionStorage.setItem("profile", JSON.stringify(profile));
        this.profile = profile;
        console.log(profile)
      },
      (error:any) => {
        console.log(error)
      }
    );
  }

  openEditUserModal() {
    this.modalReference = this.modalService.open(UserFormComponent, {
      centered: false,
      size: 'lg',
    });
    this.modalReference.componentInstance.ref = this.modalReference;
    this.modalReference.componentInstance.User = this.profile;
    this.modalReference.result.then(
      (data) => {
        const result = data;

        setTimeout(()=>{
          window.location.reload()
        },100)
        
      },
      (reason) => {
        // on dismiss
      }
    );
  }

  openNiDocument(): void {
    this.modalReference = this.modalService.open(ProfilePicModalComponent, {
      centered: false,
    });
    this.modalReference.componentInstance.ref = this.modalReference;
    this.modalReference.componentInstance.nid_doc = this.profile?.nid_document;
    this.modalReference.result.then(
      (data) => {
        const result = data;
      },
      (reason) => {
        // on dismiss
      }
    );
  }

  updaloadNationalId(){
    if(this.nid_doc){
      this.apiService.upload_national_id(this.formData).subscribe(
        (response: any) => {
          console.log('response',response)
          this.getProfile()
        },
        (error: any) => {
          //this.isLoading = false;
          console.log(error?.error)
        }
      )
    }else{
      return
    }
      

  }

  onFIdSelectionChange($event: any): void {
    this.nid_doc = ''
    if ($event.target.files && ($event.target.files[0] as File)) {
      const file = $event.target.files[0] as File;
      this.nid_doc = file
        this.formData.append('nid_document', file);      
    }
  }

  onFileSelectionChange($event: any): void {
    if ($event.target.files && ($event.target.files[0] as File)) {
      const file = $event.target.files[0] as File;
      this.formData.append('profile_photo', file);
    }
  }
}
