import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Publication } from '../interfaces/publication';
import { FormGroup } from '@angular/forms';
import { UsersService } from './users.service';
import { PubStatusService } from './pub-status.service';
import { TopicsService } from './topics.service';
import { User } from '../interfaces/user';
import { Publication_Status } from '../interfaces/publication_status';
import { LoginService } from './login.service';
import { Publication_Topics } from '../interfaces/publication_topics';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private baseUrl = 'http://127.0.0.1:7007/ws/';
  private user: User = new User;
  private status: Publication_Status = new Publication_Status;

  constructor(private http: HttpClient, private userService: UsersService, private pubStatusService: PubStatusService) {
    let username: string | null = localStorage.getItem('username');
    let token: string | null = localStorage.getItem('token')
    //this.userService.getUser(username, token).subscribe((user) => this.user = user);
    //this.pubStatusService.getOne('Por Aprovar').subscribe((status) => this.status = status)
  }

  getPublication(id: number): Observable<Publication> {
    return this.http.get<Publication>(this.baseUrl + 'pub?id=' + id);
  }

  createPublication(form: FormGroup, topics: Publication_Topics[],token:string): Observable<Publication> {

    let publication: Publication = new Publication;
    topics.forEach(element => {
      if (element.description == form.value.topic) {
        publication.topic = element;
      }

    });
    const id: number = +localStorage.getItem("id")!;
    this.user.id = id;
    this.status.description = 'Por Aprovar';
    publication.status = this.status;
    publication.title = form.value.title;
    publication.content = form.value.content;
    publication.author = this.user;
    console.log("publicação",publication)
    return this.http.post<Publication>(this.baseUrl + 'pubcrate', publication,  { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }

  getActivePublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getPublicationsApproved');
  }

  getPendentPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getPublicationsPendent');
  }

  getClosedPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getPublicationsFiled');
  }

  getActivePublicationsByUser(id: number,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getAuthorPublicationsApproved?id=' + id, 
    { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    }
    );
  }

  getPendentPublicationsByUser(id: number,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getAuthorPublicationsPendent?id=' + id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getClosedPublicationsByUser(id: number,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getAuthorPublicationsFiled?id=' + id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getFavouritePublicationsByUser(id: number,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getAuthorFavoritePublications?id=' + id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getSearchPublicationsApproved(author: string, date: string, topic: string, title: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsApproved?author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title);
  }
  getSearchPublicationsFilled(author: string, date: string, topic: string, title: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsFilled?author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title);
  }
  getSearchPublicationsPendent(author: string, date: string, topic: string, title: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsPendent?author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title);
  }

  getSearchPublicationsApprovedByUser(id: number, date: string, topic: string, title: string,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsApprovedByUser?id=' + id + '&&date=' + date + '&&topic=' + topic + '&&title=' + title,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
  getSearchPublicationsFilledByUser(id: number, date: string, topic: string, title: string,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsFilledByUser?id=' + id + '&&date=' + date + '&&topic=' + topic + '&&title=' + title,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
  getSearchPublicationsPendentByUser(id: number, date: string, topic: string, title: string,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsPendentByUser?id=' + id + '&&date=' + date + '&&topic=' + topic + '&&title=' + title,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
  getSearchPublicationsApprovedFavorite(id: number, author: string, date: string, topic: string, title: string,token:string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'getSearchPublicationsFavorites?id=' + id + '&&author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  updatePublication(publication: Publication,token:string): Observable<any> {
    const url = this.baseUrl + 'pubupd'
    return this.http.put(url, publication, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }
}
