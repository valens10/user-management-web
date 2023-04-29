import { Component, Input, NgModuleRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm!: FormGroup;
  @Input() public User = {};
  @Input() public ref: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
   this.createForm()
  }


  createForm() {
     this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      age: ['', Validators.required],
      nationalId: ['', Validators.required],
      martialStatus: ['', Validators.required]
    });
  }
}
