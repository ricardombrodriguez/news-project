import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Favorite } from '../interfaces/favorite';
import { User } from '../interfaces/user';
import { Publication } from '../interfaces/publication';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'http://127.0.0.1:7007/ws/';

  constructor(private http: HttpClient) { }


  checkIfFavorite( user_id:number,pub_id:number): Observable<Favorite> {
    console.log("AQUIII")
    return this.http.get<Favorite>(this.baseUrl + 'checkIfFavorite?id=' + pub_id+'&&user_id='+user_id);
  }

  addFavorite(fav:Favorite,token:string) : Observable<any> {
    return this.http.post(this.baseUrl + 'favcre',fav,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }
  deleteFavorite(fav:Favorite,token:string): Observable<any>{
    return this.http.delete<Favorite>(this.baseUrl + 'favdel/'+fav.id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
 
}
