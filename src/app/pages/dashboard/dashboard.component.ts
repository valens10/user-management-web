import { Component, OnInit } from '@angular/core';
import { PagesService } from '../service/pages.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarExpanded = true;
  profile = JSON.parse(window.sessionStorage.getItem('profile') as string);
  constructor(private apiService: PagesService, private router:Router){}

  ngOnInit(): void {
    console.log(this.profile)
  }


  logout() {
    window.sessionStorage.clear(); 
    this.apiService.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    }; 

     this.router.navigate(['/auth/login']); 
  }
}
