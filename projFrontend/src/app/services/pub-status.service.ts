import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { Publication_Status } from '../interfaces/publication_status';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PubStatusService {

  private baseUrl = environment.apiURL;
  private expressURL = environment.expressURL;


  
  constructor(private http: HttpClient) { }

  getStatus(): Observable<Publication_Status[]> {
    return this.http.get<Publication_Status[]>(this.baseUrl + 'pubstatus');
  }
  
  getOne(description : string): Observable<Publication_Status> {
    return this.http.get<Publication_Status>(this.baseUrl + 'pubstatus/' + description);
  }
}
