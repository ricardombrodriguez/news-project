import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Publication } from '../interfaces/publication';
import { FormGroup } from '@angular/forms';
import { UsersService } from './users.service';
import { PubStatusService } from './pub-status.service';
import { User } from '../interfaces/user';
import { Publication_Status } from '../interfaces/publication_status';
import { Publication_Topics } from '../interfaces/publication_topics';
<<<<<<< HEAD
import { RedisService } from './redis.service';
import * as crypto from 'crypto';
import { map } from 'rxjs/operators';

=======
import { environment } from '../../environments/environment';
>>>>>>> 91c97ac18931bb75d017f2faa01c4db8d19a4796


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private baseUrl = `http://django.gic-group-6.k3s/ws/`;

  private user: User = new User;
  private status: Publication_Status = new Publication_Status;


  constructor(private http: HttpClient, private userService: UsersService, private pubStatusService: PubStatusService, private redisService: RedisService) {
    let username: string | null = localStorage.getItem('username');
    let token: string | null = localStorage.getItem('token')
  }

  hashString(str: string): string {

    const hash = crypto.createHash('sha256');
    return hash.update(str).digest('hex');
  }

  async getPublication(id: number): Promise<Observable<Publication>>{
    const hashedId = this.hashString(id.toString());
    const cachedData = this.redisService.get(hashedId);
    if (cachedData) {
      return JSON.parse(await cachedData);
    }
    const pub = this.http.get<Publication>(this.baseUrl + 'publication/' + id + '/')
      .pipe(
        map((pub: Publication) => {
          this.redisService.set(hashedId, JSON.stringify(pub));
          return pub;
        })

      );
    return pub;

  }

  createPublication(form: FormGroup, topics: Publication_Topics[], token: string): Observable<Publication> {

    let publication: Publication = new Publication;
    topics.forEach(element => {
      if (element.description == form.value.topic) {
        publication.topic = element;
      }
    });

    const id: number = +localStorage.getItem("id")!;
    this.user.id = id;
    this.status.description = 'Pendent';
    publication.status = this.status;
    publication.title = form.value.title;
    publication.content = form.value.content;
    publication.author = this.user;

    return this.http.post<Publication>(this.baseUrl + 'publication', publication, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }


  getPublicationsByStatus(status: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'publications/' + status);
  }

  getUserPublicationsByStatus(id: number, token: string, status: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'author/publications/' + status + "?id=" + id,
      {
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getFavouritePublicationsByUser(id: number, token: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'user/likes/?id=' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getSearchPublicationsByStatus(author: string, date: string, topic: string, title: string, status: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'publications/search/' + status + '?author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title);
  }


  getSearchPublicationsByStatusAndUser(id: number, date: string, topic: string, title: string, token: string, status: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'author/publications/search/' + status + '?id=' + id + '&&date=' + date + '&&topic=' + topic + '&&title=' + title, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }


  getSearchPublicationsApprovedFavorite(id: number, author: string, date: string, topic: string, title: string, token: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.baseUrl + 'user/search/likes?id=' + id + '&&author=' + author + '&&date=' + date + '&&topic=' + topic + '&&title=' + title, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  updatePublication(publication: Publication, token: string): Observable<any> {
    const url = this.baseUrl + 'publication/' + publication.id
    return this.http.put(url, publication, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }
}
