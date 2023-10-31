import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-with-magic-link',
  templateUrl: './login-with-magic-link.component.html',
  styleUrls: ['./login-with-magic-link.component.scss']
})
export class LoginWithMagicLinkComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private apiService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const loginId = params['login_id'];


      if (loginId) {
        this.login(loginId);
      }
    })
  }

  login(loginId: any): void {
    this.isLoading = true;
    this.apiService.login_with_magic_link(loginId).subscribe((res: any) => {
      this.isLoading = false;
      window.sessionStorage.setItem("profile", JSON.stringify(res));
      const message = 'You have been logged in successful.'
      this.successAlert(message)
    }, (error) => {
      this.isLoading = false;
    });
  }

  // Success alert
  successAlert(message: any) {
    let timerInterval: any
    Swal.fire({
      icon: 'success', title: 'Logged In', html: `${message}`, timer: 2000, timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = '../pages/ums/home'

      }
    })
  }

}
