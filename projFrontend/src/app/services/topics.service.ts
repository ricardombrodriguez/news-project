import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Publication_Topics } from '../interfaces/publication_topics';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  
  //private baseUrl = environment.apiURL;

  private baseUrl = `http://django.gic-group-6.k3s/ws/`;


  constructor(private http: HttpClient) { }

  getTopic(description: string): Observable<Publication_Topics> {
    return this.http.get<Publication_Topics>(this.baseUrl + 'pubtopic/' + description);
  }

  getTopics(): Observable<Publication_Topics[]> {
    return this.http.get<Publication_Topics[]>(this.baseUrl + 'pubtopics');
  }

  getEnabledTopics(): Observable<Publication_Topics[]> {
    return this.http.get<Publication_Topics[]>(this.baseUrl + 'pubtopics/enabled');
  }

  createTopic(form: FormGroup,token:string): Observable<any> {

    let topic: Publication_Topics = new Publication_Topics;
    topic.description = form.value.description;
    topic.enabled = true;
    return this.http.post(this.baseUrl + 'pubtopic', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  updateTopic(topic: Publication_Topics, description: string,token:string): Observable<any> {

    topic.description = description;
    return this.http.put(this.baseUrl + 'pubtopic/' + topic.id + '/', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  disableTopic(topic: Publication_Topics,token:string): Observable<any> {

    return this.http.put(this.baseUrl + 'pubtopic/' + topic.id + '/disable', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  enableTopic(topic: Publication_Topics,token:string): Observable<any> {

    return this.http.put(this.baseUrl + 'pubtopic/' + topic.id + '/enable', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }


}
