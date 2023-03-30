import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Comment } from '../interfaces/comment';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'http://127.0.0.1:7007/ws/';
  constructor(private http: HttpClient) { }

  getComments( pub_id:number): Observable<Comment[]> {
    console.log("AQUIII")
    return this.http.get<Comment[]>(this.baseUrl + 'commentsPublication?id=' + pub_id);
  }

  deleteComment(comment:Comment,token:string) : Observable<any> {
    return this.http.delete<Comment>(this.baseUrl+'commentdel/'+comment.id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }

  createComment(comment:Comment,token:string): Observable<any>{
    return this.http.post(this.baseUrl+'commentcre',comment,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })

  }
}
