import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-pic-modal',
  templateUrl: './profile-pic-modal.component.html',
  styleUrls: ['./profile-pic-modal.component.scss']
})
export class ProfilePicModalComponent {
  @Input() public ref: any;
  constructor() {}
}
