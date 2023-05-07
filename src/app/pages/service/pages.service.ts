import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
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

  get_user_details(user_id: any) {
    const endpoint = `users/${user_id}`;
    return this.http.delete(this.BASE_URL + endpoint, this.headers);
  }

  deleteUser(user_id: any) {
    const endpoint = `users/${user_id}`;
    return this.http.get(this.BASE_URL + endpoint, this.headers);
  }

  update_user_details(user_id:any,data: any) {
    const endpoint = `users/${user_id}`;
    return this.http.patch(this.BASE_URL + endpoint, data, this.headers);
  }

  update_user_profile_pic(user_id:any,data: any) {
    const endpoint = `users/${user_id}`;
    return this.http.patch(this.BASE_URL + endpoint, data, this.fHeaders);
  }

  get_users() {
    const endpoint = `users`;
    return this.http.get(this.BASE_URL + endpoint, this.headers);
  }


  upload_national_id(data: any) {
    const endpoint = `verifications/upload-verification-documents`;
    return this.http.post(this.BASE_URL + endpoint, data, this.fHeaders);
  }

  verify_account(data: any) {
    const endpoint = `verifications/verify-account`;
    return this.http.post(this.BASE_URL + endpoint, data, this.headers);
  }


  change_password(data: any) {
    const endpoint = `auth/change-password`;
    return this.http.post(this.BASE_URL + endpoint, data, this.fHeaders);
  }

}
