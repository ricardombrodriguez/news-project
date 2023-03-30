import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../interfaces/group';
import { User } from '../interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://127.0.0.1:7007/ws/';

  constructor(private http: HttpClient) { }

  getUser(username: string | null, token: string | null): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'get_user?username=' + username,
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
    return this.http.put(this.baseUrl + 'userupd', au, { 
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
    return this.http.get<Group[]>(this.baseUrl + 'get_groupDescription?description=' + description,
      {
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }
  getUsersPossible(group: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getSearchUsersPossible?group=' + group);
  }

  getUsersSearch(topic: string, group: string, name: string, username: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getSearchUsers?group=' + group + '&&topic=' + topic + '&&name=' + name + '&&username=' + username)
  }
}
