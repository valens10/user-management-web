import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-identification-modal',
  templateUrl: './identification-modal.component.html',
  styleUrls: ['./identification-modal.component.scss']
})
export class IdentificationModalComponent {
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
