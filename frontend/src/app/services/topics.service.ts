import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Publication_Topics } from '../interfaces/publication_topics';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private baseUrl = 'http://127.0.0.1:7007/ws/';

  constructor(private http: HttpClient) { }

  getTopic(description: string): Observable<Publication_Topics> {
    return this.http.get<Publication_Topics>(this.baseUrl + 'pubtopicsgetByDescription?description=' + description);
  }

  getTopics(): Observable<Publication_Topics[]> {
    return this.http.get<Publication_Topics[]>(this.baseUrl + 'pubtopicsgetAll');
  }

  getEnabledTopics(): Observable<Publication_Topics[]> {
    return this.http.get<Publication_Topics[]>(this.baseUrl + 'pubtopicsenabledgetAll');
  }

  createTopic(form: FormGroup,token:string): Observable<any> {

    let topic: Publication_Topics = new Publication_Topics;
    topic.description = form.value.description;
    topic.enabled = true;
    return this.http.post(this.baseUrl + 'pubtopicscreate', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  updateTopic(topic: Publication_Topics, description: string,token:string): Observable<any> {

    topic.description = description;
    return this.http.put(this.baseUrl + 'pubtopicsupdate', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  disableTopic(topic: Publication_Topics,token:string): Observable<any> {

    return this.http.put(this.baseUrl + 'pubtopicsdisable', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  enableTopic(topic: Publication_Topics,token:string): Observable<any> {

    return this.http.put(this.baseUrl + 'pubtopicsenable', topic, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }


}
