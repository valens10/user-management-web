import { Component, Input, NgModuleRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from './constants/countries';
import { PagesService } from '../../service/pages.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
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
      phone_number:[this.User.phone_number],
      birthdate: [this.User.birthdate, [Validators.required]],
      email: [this.User.email, [Validators.required]],
      first_name: [this.User.first_name, [Validators.required]],
      last_name: [this.User.last_name, [Validators.required]],
      gender: [this.User.gender, [Validators.required]],
      marital_status: [this.User.marital_status, [Validators.required]],
      nationality:[this.profile.nationality? this.getCountryCode(this.profile.nationality): '',[Validators.required]],
      nid_number: [this.User.nationality, [Validators.required]]
    });
  }

  // Onsubmit
  onSubmit(){
    this.errorMsg = ''
    if(this.userForm.valid){
      const param = this.userForm.value
      const user_id = this.profile.id
      this.apiService.update_user_details(user_id, param).subscribe(
        (response: any) => {
          this.ref.close(response)
        },
        (error: any) => {
          this.errorMsg = 'A user with the phone number Alread exist'
        }
      );
    }else{
      this.errorMsg = 'All inputs with red (*) are required'
    }
  }

  // get Country code
  getCountryCode(name: string): string {
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];

      if (country.name == name) {
        return country.isoCode;
      }
    }

    return '';
  }
}
