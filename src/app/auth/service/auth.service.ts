import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:8000/';

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  fHeaders = {
    headers: new HttpHeaders({}),
  };

  constructor(private http: HttpClient) {
    const profile = JSON.parse(
      window.sessionStorage.getItem('profile') as string
    );

    if (profile) {
      this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${profile.token}`,
        }),
      };

      this.fHeaders = {
        headers: new HttpHeaders({
          Authorization: `Token ${profile.token}`,
        }),
      };
    }
  }

/**Login service will accept user credential and return auth data
 * @param data : username && password
 * @returns User instance
 */
  login(data: any) {
    const endpoint = 'auth/authenticate'
    return this.http.post(this.BASE_URL + endpoint , data, this.headers);
  }

  request_otp(data: any) {
    const endpoint = 'auth/request-verification-code'
    return this.http.post(this.BASE_URL + endpoint , data, this.headers);
  }

  change_password(data: any) {
    const endpoint = 'auth/verify-change-password'
    return this.http.post(this.BASE_URL + endpoint , data, this.headers);
  }

}
