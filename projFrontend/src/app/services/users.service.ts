import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //private baseUrl = environment.apiURL;
  //private expressURL = environment.expressURL;

  private baseUrl = `http://django.gic-group-6.k3s/ws/`;


  constructor(private http: HttpClient) { }

  getUser(username: string | null, token: string | null): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + username,
      {
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  updateUser(au: User,token:string): Observable<any> {
    return this.http.put(this.baseUrl + 'user/' + au.id + '/', au, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }

  getGroups(token: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + 'groups',
      {
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }
  get_groupDescription(token: string, description: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + 'group/' + description,
      {
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }
  
  getUsersPossible(group: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/search/group/' + group);
  }

  getUsersSearch(topic: string, group: string, name: string, username: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/search?group=' + group + '&&topic=' + topic + '&&name=' + name + '&&username=' + username)
  }
}
