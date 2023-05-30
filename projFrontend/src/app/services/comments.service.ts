import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Comment } from '../interfaces/comment';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseUrl = environment.apiURL;
  private expressURL = environment.expressURL;



  constructor(private http: HttpClient) { }

  getComments(pub_id : number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + 'publication/' + pub_id + '/comments');
  }

  deleteComment(comment : Comment, token : string) : Observable<any> {
    return this.http.delete<Comment>(this.baseUrl + 'comment/' + comment.id + '/',{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }

  createComment(comment : Comment, token : string): Observable<any>{
    return this.http.post(this.baseUrl + 'comment', comment, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })

  }
}
