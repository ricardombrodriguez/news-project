import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userId = new Subject<string | null>()

  
  private baseUrl = environment.apiURL;
  private expressURL = environment.expressURL;


  curentUserId = localStorage.getItem('user_id')

  constructor(private http: HttpClient) {
  }

  register = (username: string, first_name: string, last_name: string, password: string) => {
    const body = JSON.stringify(
      {
        "username": username,
        "password": password,
        "first_name": first_name,
        "last_name": last_name
      }
    );

    return this.http.post(
      this.baseUrl + "user",
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

}