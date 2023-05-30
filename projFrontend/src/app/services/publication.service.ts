import { environment } from './../../environments/environment';
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
import { catchError, defer, from } from 'rxjs';
import fetch from 'node-fetch';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  //private baseUrl = `http://django.gic-group-6.k3s/ws/`;
  //private baseUrl = `http://localhost:7007/ws/`;

  private baseUrl = environment.apiURL;
  private expressURL = environment.expressURL;

  private user: User = new User;
  private status: Publication_Status = new Publication_Status;

  constructor(private http: HttpClient, private userService: UsersService, private pubStatusService: PubStatusService) {
    let username: string | null = localStorage.getItem('username');
    let token: string | null = localStorage.getItem('token');
  }

  searchRequest(request: any): void {
    // console.log("search request");
    // return new Promise<string | null>((resolve, reject) => {
    //   const key = request;
    //   console.log("get key ", key);
    //   this.http.get('http://localhost:8000/get/' + key).subscribe({
    //     next: (response) => {
    //       // Handle the JSON response
    //       console.log("RESPOSTA");
    //       console.log(response);
    //     },
    //     error: (error) => {
    //       // Handle any errors
    //       console.error('An error occurred:', error);
    //     },
    //   });
    // });

    const key = request;
    this.http.get(this.expressURL + "/get" + key)
    .subscribe(
      (responseData) => {
        console.log('Response data:', responseData);
      },
      (error) => {
        console.error('Error occurred during HTTP request:', error);
      }
    );
      
  }

  getPublication(id: number): Observable<Publication> {
    console.log("search request");
  
    let pub;
    pub = from(new Promise<Publication>((resolve, reject) => {
      const key = id;
      console.log("get key ", key);
      this.http.get(this.expressURL + "/get"+ key).subscribe({
        next: (response) => {
          return response;
        },
        error: (error) => {
          if (error.status === 404) {
            // Make the API request to get the data
            this.http.get<Publication>(this.baseUrl + 'publication/' + id + '/').subscribe((apiResponse) => {
              // Save the data to the backend or perform any other desired actions
              // resolve(apiResponse);
  
              this.saveCache(apiResponse); // Call the saveCache function to save the data in cache
              return apiResponse;
            }, (apiError) => {
              console.error("API error occurred:", apiError);
              // Handle API error, e.g., reject the promise or perform fallback actions
              // reject(apiError);
            });
          } else {
            console.error("An error occurred:", error);
            // Handle other error statuses if needed
            // reject(error);
          }
        },
      });
    }));
  
    console.log("Pub do redis :::: ", pub);
    return pub;
    
  }
  

  saveCache(pub: Publication) {
    console.log("saving pub in cache ", pub);
    const cacheData = {
      key: pub.id.toString(),
      value: JSON.stringify(pub)
    };
    this.http.post(this.expressURL + "/set", cacheData).subscribe({
      next: (response) => {
        console.log("Cache saved successfully:", response);
      },
      error: (error) => {
        console.error("Error saving to cache:", error);
      }
    });
    console.log("filho da puta aleezz");
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
