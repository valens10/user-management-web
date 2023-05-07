import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-pic-modal',
  templateUrl: './profile-pic-modal.component.html',
  styleUrls: ['./profile-pic-modal.component.scss']
})
export class ProfilePicModalComponent implements OnInit {
  @Input() public nid_doc: any = '';
  @Input() public ref: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.nid_doc)
    //throw new Error('Method not implemented.');
  }
}
