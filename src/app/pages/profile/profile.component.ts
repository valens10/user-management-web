import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modal/user-form/user-form.component';
import { Router } from '@angular/router';
import { PagesService } from '../service/pages.service';
import { ProfilePicModalComponent } from '../modal/profile-pic-modal/profile-pic-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);
  formData: FormData = new FormData();
  showUpload: boolean = false;
  passwordErrorMessage = ''
  profPic:any = 'https://via.placeholder.com/150'
  form!: FormGroup;
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
    private router:Router,
    private fb: FormBuilder,
    ){}

  ngOnInit(): void {
    this.getProfile();
    this.createPasswordForm()

  }

  createPasswordForm() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      new_password: ['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/),],]
    });
  }

  changePassword() {
    console.log('--->',this.form.valid)
    this.passwordErrorMessage = ''
    if (this.form.valid) {
      let param = this.form.value;
      this.apiService.change_password(param).subscribe(
        (response: any) => {
         console.log(response)
        },
        (error: any) => {
          this.passwordErrorMessage = error?.error['detail'][2]
          console.log(error?.error['detail'][2])
        }
      );
    }else{
      this.formValidation()
    }
    
  }

  formValidation() {
    const passwordErrors: any = this.form.get('new_password')?.errors; //get password errors
    console.log(passwordErrors)
    if (passwordErrors) {
      if (passwordErrors.required) {
        this.passwordErrorMessage = 'Password is required.';
      } else if (passwordErrors.minlength) {
        this.passwordErrorMessage ='Password must be at least 8 characters long.';
      } else if (passwordErrors.pattern) {
        this.passwordErrorMessage =
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    }
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

  downloadNid(){
    window.open(this.profile?.nid_document)
  }

  onFIdSelectionChange($event: any): void {
    this.nid_doc = ''
    if ($event.target.files && ($event.target.files[0] as File)) {
      const file = $event.target.files[0] as File;
      this.nid_doc = file
        this.formData.append('nid_document', file);      
    }
  }

  onFileSelected($event: any): void{
    if ($event.target.files && ($event.target.files[0] as File)) {
      const file = $event.target.files[0] as File;
        this.formData.append('profile_photo', file);  
        const user_id = this.profile?.id
        this.apiService.update_user_profile_pic(user_id, this.formData).subscribe(
          (response: any) => {
            console.log('response',response)
            this.getProfile()
          },
          (error: any) => {
            console.log(error?.error)
          }
        )    
    }
  }

}
