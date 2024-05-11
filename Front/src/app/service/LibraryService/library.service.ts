import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obstacle } from './obstacle';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getObstaclInfo(token?: string): Observable<Obstacle[]> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `${token}`);
    }
    const options = { headers: headers};
    return this.http.get<Obstacle[]>('http://localhost:3000/api/obstacles/',options);
  }
}
