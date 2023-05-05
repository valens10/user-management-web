import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { countries } from '../user-form/constants/countries';

@Component({
  selector: 'app-update-verification',
  templateUrl: './update-verification.component.html',
  styleUrls: ['./update-verification.component.scss']
})
export class UpdateVerificationComponent implements OnInit {
  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);
  userForm!: FormGroup;
  errorMsg = ''
  countries:any = countries
  @Input() public User:any = {};
  @Input() public ref: any;
  constructor(private fb: FormBuilder, private apiService: PagesService, ) {}

  ngOnInit() {
   this.createForm()
   console.log(this.countries)
  }


  createForm() {
     this.userForm = this.fb.group({
      verification_status:['', [Validators.required]],
    });
  }

  // Onsubmit
  onSubmit(){
    this.errorMsg = ''
    if(this.userForm.valid){
      const param = this.userForm.value
      param['user'] = this.User.id
      this.apiService.verify_account(param).subscribe(
        (response: any) => {
          this.ref.close(response)
        },
        (error: any) => {
          console.log(error)
        }
      );
    }else{
      this.errorMsg = 'Verification status is required.'
    }
  }


}