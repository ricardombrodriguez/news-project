import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Publication_Status } from '../interfaces/publication_status';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PubStatusService {
  private baseUrl = 'http://127.0.0.1:7007/ws/';
  constructor(private http: HttpClient) { }
  getStatus(): Observable<Publication_Status[]> {
    return this.http.get<Publication_Status[]>(this.baseUrl + 'pubstatusgetALl');
  }
  
  getOne(description:string): Observable<Publication_Status> {
    return this.http.get<Publication_Status>(this.baseUrl + 'pubstatusgetOne?description='+description);
  }
}
