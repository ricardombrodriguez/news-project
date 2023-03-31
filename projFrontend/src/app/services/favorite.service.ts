import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Favorite } from '../interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = 'http://127.0.0.1:7007/ws/';

  constructor(private http: HttpClient) { }

  checkIfFavorite(user_id : number, pub_id : number): Observable<Favorite> {
    return this.http.get<Favorite>(this.baseUrl + 'publication/' + pub_id + '/like/verify?user_id='+user_id);
  }

  addFavorite(fav : Favorite, token : string) : Observable<any> {
    return this.http.post(this.baseUrl + 'publication/' + fav.publication.id + '/like', fav,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }
  deleteFavorite(fav : Favorite, token : string): Observable<any>{
    return this.http.delete<Favorite>(this.baseUrl + 'like/' + fav.id  + '/', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
 
}
