import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //private baseUrl = environment.apiURL;
  //private expressURL = environment.expressURL;

  private baseUrl = `http://django.gic-group-6.k3s/ws/`;


  constructor(private http: HttpClient) { }

  logIn = (username: string, password: string) => {
      const body=JSON.stringify({"username": username, "password": password});

      return this.http.post(
        this.baseUrl+"login_token", 
        body,
        { 
          headers: new HttpHeaders({
            'Authorization': 'Basic ' + btoa(username +':'+ password),
            'Content-Type': 'application/json',
          }),
        }
      );
  }

  getUserInfo = (username: string, token: string) => {
    return this.http.get(
      this.baseUrl + "user/" + username,
      { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
